const KoaRouter = require('koa-router');
const BasicAuth = require('basic-auth');

module.exports = (app, data) => {
  const router = KoaRouter();

  /**
   * Authenticate API requests.
   */
  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api') &&
      !ctx.path.startsWith('/api/login') &&
      !ctx.path.startsWith('/api/registration')) {
      let credentials = BasicAuth(ctx.req);

      if (credentials && credentials.pass) {
        let user = data.getUserForAccessToken(credentials.pass);

        if (user) {
          ctx.user = user;

          await next();
        } else {
          ctx.throw(401);
        }
      } else {
        ctx.throw(401);
      }
    } else {
      await next();
    }
  });

  /**
   * POST /api/registration
   */
  router.post('/api/registration', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (!username || !password) {
      console.log(`Invalid Username or Password`);
      ctx.throw(400);
    } else if (data.users.find(x => x.username === username)) {
      console.log(`User ${username} already exists`);
      ctx.throw(409);
    } else {
      let user = {
        id: data.users.length + 1,
        username: username,
        password: password,
        wallets: [data.createNewWallet()]
      };
      data.users.push(user);
      let wallet = {address: user.wallets[0], balance: 10};
      data.wallets.push(wallet);
      ctx.body = {
        token: data.getOrCreateAccessToken(user.id),
        username: user.username,
        wallets: user.wallets
      };
      console.log(`Welcome ${username}`);
    }
  });

  /**
   * POST /api/login
   */
  router.post('/api/login', async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let user = data.users.find(user => {
      return user.username === username && user.password === password;
    });

    if (user) {
      console.log(`Logging in user ${JSON.stringify(user)}`);

      ctx.body = {
        token: data.getOrCreateAccessToken(user.id),
        username: user.username,
        wallets: user.wallets
      };
    } else {
      console.log(`No user found with username ${username} and password ${password}`);

      ctx.throw(401);
    }
  });

  /**
   * GET /api/wallets
   *
   * Lists all wallets in the Slothereum network.
   */
  router.get('/api/wallets', async ctx => {
    ctx.body = data.wallets;
  });

  /**
   * GET /api/wallets/mine
   *
   * Retrieve the wallet of the current user.
   */
  router.get('/api/wallets/mine', async ctx => {
    ctx.body = data.listWalletsForUser(ctx.user.id);
  });

  /**
   * GET /api/wallets/:address
   *
   * Retrieve a wallet by address (yep, wallets are world readable).
   */
  router.get('/api/wallets/:address', async ctx => {
    let address = ctx.params.address;
    let wallet = data.wallets.find(wallet => {
      return wallet.address === address;
    });

    if (wallet) {
      ctx.body = wallet;
    } else {
      ctx.throw(404);
    }
  });

  /**
   * POST /api/transactions
   *
   * Creates a transaction to transfer money from one wallet to another.
   */
  router.post('/api/transactions', async ctx => {
    let transaction = ctx.request.body;
    let sourceWallet = data.getWalletByAddress(transaction.source);
    let destinationWallet = data.getWalletByAddress(transaction.destination);
    let amount = Number(transaction.amount);

    if (!sourceWallet) {
      ctx.throw(400, 'Source address is invalid!');
    } else if (ctx.user.wallets.indexOf(sourceWallet.address) === -1) {
      ctx.throw(400, 'Source address does not belong to you!');
    } else if (amount > sourceWallet.balance) {
      ctx.throw(400, "Source address doesn't have that much coin!");
    } else if (!destinationWallet) {
      ctx.throw(400, 'Destination address is invalid!');
    } else if (amount <= 0 || amount > 1000000) {
      ctx.throw(400, 'Amount is outside the acceptable range!');
    } else {
      ctx.body = await data.processTransaction(transaction.source, transaction.destination, Number(transaction.amount));
    }
  });

  return router;
};
