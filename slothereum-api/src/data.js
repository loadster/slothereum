/**
 * The Slothereum data layer, such as it is.
 */

const RandomString = require('randomstring');

const accessTokens = {};

const data = {
  users: [
    {
      id: 1,
      username: 'user1@slothereum.cc',
      password: 'secret',
      wallets: ['a6b92a']
    },
    {
      id: 2,
      username: 'user2@slothereum.cc',
      password: 'secret',
      wallets: ['b3b40f', 'cab954']
    }
  ],
  wallets: [
    {
      owner: 1,
      address: 'a6b92a',
      balance: 300
    },
    {
      owner: 2,
      address: 'b3b40f',
      balance: 500
    },
    {
      owner: 2,
      address: 'cab954',
      balance: 100
    }
  ]
};

data.createNewWallet = (owner) => {
  let generateRandomWalletId = () => {
    return Math.random().toString(16).substring(9);
  };

  let checkIfWalletIdIsTaken = (address) => {
    return data.wallets.find(wallet => wallet.address === address);
  };

  let x = generateRandomWalletId(owner);

  if (!checkIfWalletIdIsTaken(x)) {
    return x;
  } else {
    data.createNewWallet(owner);
  }
};

data.listWalletsForUser = (userId) => {
  let user = data.getUserById(userId);

  return data.wallets.filter(wallet => {
    return user.wallets.indexOf(wallet.address) >= 0;
  });
};

data.getWalletByAddress = (address) => {
  return data.wallets.find(wallet => {
    return wallet.address === address;
  });
};

data.getUserById = (userId) => {
  return data.users.find(user => {
    return user.id === userId;
  });
};

data.getUserForAccessToken = (token) => {
  return data.users.find(user => {
    return accessTokens[user.id] === token;
  });
};

data.getOrCreateAccessToken = (userId) => {
  let user = data.getUserById(userId);

  if (!user) {
    throw new Error(`No user found with id ${userId}!`);
  }

  let token = accessTokens[user.id];

  if (!token) {
    token = RandomString.generate(16);

    accessTokens[user.id] = token;

    console.log(`Generated access token ${token} for user ${userId}`);
  }

  return token;
};

// TODO - MOAR BLOCKCHAIN!
data.processTransaction = async (source, destination, amount) => {
  return new Promise(resolve => {
    setTimeout(() => {
      let sourceWallet = data.getWalletByAddress(source);
      let destinationWallet = data.getWalletByAddress(destination);

      sourceWallet.balance -= amount;
      destinationWallet.balance += amount;

      resolve({
        identifier: RandomString.generate(32),
        source: source,
        destination: destination,
        amount: amount
      });
    }, Math.round(0.2 + Math.random() * 1.3));
  });
};

module.exports = data;
