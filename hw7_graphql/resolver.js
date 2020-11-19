class GraphQLResolver {
  constructor(client, dbName) {
    return {
      categories: async () => {
        const db = client.db(dbName);
        const categories = await db.collection('categories').find().toArray();
        categories.forEach(item => item.url = `/catalog/${item.code}/`);
        return categories;
      },
      category: async(args) => {
        const db = client.db(dbName);
        // можем выполнить запросы на выборку данных категории и товаров параллельно.
        // Для этого положим вызовы выборок в массив промисов и будем ждать завершения обоих
        // после этого деструктурируем результат
        const [ category, products ] = await Promise.all([
          db.collection('categories').findOne({code:args.code}),
          db.collection('products').find({category:args.code}).toArray()
        ]);
        //формируем вычисляемые поля
        category.url = `/catalog/${category.code}/`;
        products.forEach(element => element.url = `/catalog/${args.code}/${element.sku}.html`);
        //дополняем данные категории списком товаров и возвращаем результат
        category.products = products;
        return category;
      },
      product: async(args) => {
        const db = client.db(dbName);
        const product = await db.collection('products').findOne({sku:args.sku});
        product.url = `/catalog/${product.category}/${product.sku}.html`;
        return product;
      },
      createProduct: async(args) => {
        const db = client.db(dbName);
        if(args.pictures === undefined) {
          args.pictures = [];
        }
        const result = await db.collection('products').insert(args);
        return args;
      },
      deleteProduct: async(args) => {
        const db = client.db(dbName);
        const result = await db.collection('products').deleteOne({sku: args.sku});
        return args.sku;
      },
      cart: async(args) => {
        const db = client.db(dbName);
        let result = await db.collection('carts').findOne({user: args.user});
        if(result === null) {
          result =  await db.collection('carts').insertOne({user: args.user,products:[]});
        }
        return result;
      },
      addToCart: async(args) => {
        const db = client.db(dbName);
        //выбираем корзину пользователя. если нет - создаем
        let cart = await db.collection('carts').findOne({user: args.user});
        if(cart === null) {
          cart = await db.collection('carts').insertOne({user: args.user,products:[]});
        }
        //выбираем данные о товарах для обогащения корзины полями товаров (название, цена, картинка), которых нет во входных данных
        //получаем из входных данных sku товаров, кладем их в массив
        const productsSku = args.products.reduce( (prevValue, item) => {
          prevValue.push(item.sku);
          return prevValue;
        },[]);
        //формируем выборку по полученному массиву sku
        let products = await db.collection('products').find({sku: {$in: productsSku} }).toArray();
        //добавляем товары в корзину
        args.products.forEach((item) => {
          let product = products.find( productItem => {
            if(productItem.sku === item.sku) {
              return productItem;
            }
          });
          cart.products.push({
            sku: item.sku,
            name: product.name,
            picture: product.pictures && product.pictures.length > 0 ? product.pictures[0] : '',
            price: product.price,
            quantity: item.quantity
          });
        });
        //сохраняем корзину
        const result = await db.collection('carts').updateOne({_id:cart._id},{ $set: {products: cart.products} });
        return cart;
      },
      checkout: async(args) => {
        const db = client.db(dbName);
        //получаем корзину
        let cart = await db.collection('carts').findOne({user: args.user});
        if(cart == null) {
          throw new Error(`Cart for user "${args.user}" is not found!`);
        }
        //определяем номер заказа (количество заказов + 1 для упрощения)
        const ordersStats = await db.collection('orders').stats();
        const number = parseInt(ordersStats.size) + 1;

        const user = await db.collection('users').findOne({email: args.user});
        //дата заказа
        const now = new Date();
        const createdAt = `${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`;
        //собираем заказ
        const order = {
          number: number,
          createdAt: createdAt,
          user: user,
          products: cart.products,
          delivery: args.delivery,
          status: "new"
        };
        //добавляем заказ
        await db.collection('orders').insertOne(order);
        //удаляем корзину
        await db.collection('carts').deleteOne({_id:cart._id});

        return order;
      }
    }
  }
}

module.exports = GraphQLResolver;
