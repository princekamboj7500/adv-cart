// @ts-check
import path, { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import mongoose from 'mongoose';
import Jwt from "jsonwebtoken";

import storeController from './controller/storeController.js'
import StoreModel from './models/storeSchema.js';
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { billingConfig, createSubscription } from "./billing.js";
import axios from "axios";
import cors from "cors";
import multer from "multer";

mongoose.Promise = global.Promise;
 
mongoose.connect('mongodb+srv://akshaysquadifypro:Pn8r3frKkfRfnxu7@cluster0.nciqshc.mongodb.net/upsell_cart').then(() => console.log('mongoose Connected!'));
// console.log(process.env)
// @ts-ignore
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist` 
    : `${process.cwd()}/frontend/`;

const PREVIEWSTATIC_PATH = `${process.cwd()}/preview/`;

const app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})
const upload = multer({ storage: storage });
app.use(cors());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
// app.get(
//   shopify.config.auth.callbackPath,
//   shopify.auth.callback(),
//   shopify.redirectToShopifyOrAppRoot()
// );
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  // Request payment if required
  async (req, res, next) => {
    const plans = Object.keys(billingConfig);
    const session = res.locals.shopify.session;
    const hasPayment = await shopify.api.billing.check({
      session,
      plans: plans,
      isTest: true,
    }); 

    if (hasPayment) {
      await StoreModel.findOne({store: session.shop}).then(async (doc)=>{
          console.log(doc);
          var storeDetails = await storeController.storeDetails(session);
          console.log(storeDetails);
          if(doc){
            await StoreModel.findByIdAndUpdate(doc.id, {
              token: session.accessToken,
              name: storeDetails.name,
              store: session.shop
            });
          }else{
            var newStore = new StoreModel();
            newStore.name = storeDetails.name;
            newStore.store = session.shop;
            newStore.token = session.accessToken;
            newStore.email = storeDetails.email;
            newStore.currencyCode = storeDetails.currencyCode;
            newStore.myshopifyDomain = storeDetails.myshopifyDomain;
            newStore.save();
          }
          return true;
      }).catch((err)=>{
          console.log(err);
      });

      next();
    } else {
      var returnUrl = process.env.HOST+'/api/auth?shop='+session.shop;
      var billingURL = await createSubscription(session, returnUrl);
      res.redirect(billingURL);
    } 
  },
  // Load the app otherwise
  shopify.redirectToShopifyOrAppRoot(),
);
app.post(
  shopify.config.webhooks.path,
  // @ts-ignore
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use('/api/uploads', serveStatic(`${process.cwd()}/uploads/`));
app.get("/api/prevwidget/:shop",  async (_req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var widgets = await storeController.widgets(_req.params.shop);
    var doc = await StoreModel.findOne({store: _req.params.shop});
    console.log(doc.token);
    if(doc){ 
      var shoptoken = doc.token;
      var myHeaders = new Headers();
      myHeaders.append("X-Shopify-Access-Token", ""+shoptoken+"");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
      }; 
      
      fetch("https://"+_req.params.shop+"/admin/api/2020-04/products.json?limit=5", requestOptions)
        .then(response => response.text())
        .then(result => 
          res.status(200).send({allpro:JSON.parse(result),widgets:widgets}))
        .catch(error => console.log('error', error));
    }else{
      res.status(200).json({})
    }
})

app.get("/api/getallpro/:shop",  async (_req, res) => {
  console.log("aaaaaaaaaaaaaabbbbbbbbbbbbbbbbcccccc")
  res.setHeader("Access-Control-Allow-Origin", "*");
  var doc = await StoreModel.findOne({store: _req.params.shop});
  if(doc){ 
    var shoptoken = doc.token;
    var myHeaders = new Headers();
    myHeaders.append("X-Shopify-Access-Token", ""+shoptoken+"");
    var requestOptions1 = {
      method: 'GET',
      headers: myHeaders, 
      redirect: 'follow'
    }; 
    fetch("https://"+_req.params.shop+"/admin/api/2023-04/products.json?limit=250", requestOptions1)
      .then(response => response.text())
      .then(result => 
        res.status(200).send(result))
      .catch(error => console.log('error', error));
  }else{
    res.status(200).json({})
  }
})


app.get("/api/getcollection/:shop",  async (_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var doc = await StoreModel.findOne({store: _req.params.shop});
  if(doc){ 
    var shoptoken = doc.token;
    var myHeaders = new Headers();
    myHeaders.append("X-Shopify-Access-Token", ""+shoptoken+"");
    var requestOptions1 = {
      method: 'GET',
      headers: myHeaders, 
      redirect: 'follow'
    }; 
    fetch("https://"+_req.params.shop+"/admin/api/2023-01/custom_collections.json", requestOptions1)
      .then(response => response.text())
      .then(result => 
        res.status(200).send(result))
      .catch(error => console.log('error', error));
  }else{
    res.status(200).json({})
  }
})
app.get("/api/coupon/:code/:shop", cors(), async (_req, res) => {
  await console.log('comeee')
  var code = _req.params.code;
  var shop = _req.params.shop;
  const doc = await StoreModel.findOne({store: shop});
  let config = {
    method: 'get',
    withCredentials: false,
    url: 'https://'+doc.store+'/admin/api/2023-01/discount_codes/lookup.json?code='+code,
    headers: { 
      'X-Shopify-Access-Token': doc.token
    }
  };
  res.setHeader("Access-Control-Allow-Origin", "*");
  axios.request(config)
  .then((response) => {
   
    console.log(JSON.stringify(response.data.discount_code.price_rule_id));
    res.status(200).send(response.data); 
  })
  .catch((error) => {
    res.status(200).send(error); 
    console.log(error);
  });
  
});

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.post("/api/upload", upload.single('file'), async (_req, res) => {
  // Access the uploaded file using req.file
  if (!_req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(_req.file);
  // File has been uploaded successfully
  res.json(_req.file);
});

app.get("/api/profile", async (_req, res) => {
  var session = res.locals.shopify.session;
  const doc = await StoreModel.findOne({store: session.shop});
  if(doc){
    return res.status(200).json({
      name: doc.name,
      shop: doc.store,
      email: doc.email,
      currencyCode: doc.currencyCode,
      myshopifyDomain: doc.myshopifyDomain,
    });
  }else{
    return res.status(200).json();
  }
});

app.get("/api/cart", async (_req, res) => {
  var session = res.locals.shopify.session;
  if(session){
    var cart = await storeController.cart(session.shop);
    res.status(200).send(cart);
  }else{
    res.status(404).json({});
  }
});

app.post("/api/cart", async (_req, res) => {
  var session = res.locals.shopify.session;
  if(session){
    _req.body['store'] = session.shop;
    await storeController.cartSave(session, _req.body);
    var app = await storeController.getApp(session);
    // res.status(200).send(app);
    app = await storeController.saveMeta(session, app, _req.body);
    res.status(200).send(app);
    // res.status(200).send(_req.body);
  }else{
    res.status(404).send({});
  }
});

app.get("/api/widgets", async (_req, res) => {
  var session = res.locals.shopify.session;
  if(session){
    var widgets = await storeController.widgets(session.shop);
    res.status(200).send(widgets);
  }else{
    res.status(404).json({});
  }
});

app.get("/api/widgets/:id", async (_req, res) => {
  var session = res.locals.shopify.session;
  var id = _req.params.id;
  if(session){ 
    var widget = await storeController.getWidget(session.shop, id);
    res.status(200).send(widget);
  }else{
    res.status(404).json({error:true});
  }
});

app.post("/api/widgets/:id", async (_req, res) => {
  var session = res.locals.shopify.session;
  var id = _req.params.id;
  var body = _req.body;
  if(session){ 
    var widget = await storeController.updateWidget(session.shop, id, body);
    var app = await storeController.getApp(session);
    // res.status(200).send(app);
    var allwidgets = await storeController.widgets(session.shop);
    app = await storeController.widgetSavemeta(session, app, allwidgets);
    res.status(200).send(widget);
  }else{
    res.status(404).json({error:true});
  }
});

app.post("/api/widgets", async (_req, res) => {
  var session = res.locals.shopify.session;
  if(session){
    _req.body['store'] = session.shop;
    await storeController.widgetSave(session, _req.body);

    var app = await storeController.getApp(session);
    // res.status(200).send(app);
    var allwidgets = await storeController.widgets(session.shop);
    app = await storeController.widgetSavemeta(session, app, allwidgets);
    res.status(200).send(app);
  }else{
    res.status(404).send({});
  }
});



app.get("/api/widget/preview", async (_req, res) => {
  var session = res.locals.shopify.session;
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(PREVIEWSTATIC_PATH, "index.html")));
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));
app.use('/api/preview/',serveStatic(PREVIEWSTATIC_PATH, { index: false }));

app.use("/*", shopify.validateAuthenticatedSession(), async (_req, res, _next) => {
  var session = res.locals.shopify.session;
  var token = Jwt.sign({ accessToken: session.accessToken, shop: session.shop }, process.env.SHOPIFY_API_SECRET);
  // res.setHeader('Authorization', 'Bearer '+ token); 
  res.cookie('auth', token)
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
