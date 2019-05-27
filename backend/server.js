var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var _ = require('lodash');
var configureStripe = require("stripe");
var stripe = configureStripe("sk_test_LL24yqW8DJUUMa8si2sDDJEG");
//var multer = require('multer');
let busboy = require('connect-busboy');
var fs = require('fs');
var file = require('file-system');
var path = require('path');
var session = require('express-session')
var passport = require('passport');
var engine = require('ejs-locals');
var bcrypt = require('bcrypt');
const paginate = require('express-paginate');
const uploadDir = path.join(__dirname, 'images');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Book');
var dotenv = require('dotenv').config();
var Schema = mongoose.Schema;
var Admin = require('./Models/Admin.js');
var Book = require('./Models/Book');
var Cart = require('./Models/Cart');
var Category = require('./Models/Category.js');
var User = require('./Models/User.js');
var WishList = require('./Models/WishList.js');
var PromoCode = require('./Models/PromoCode.js');
var Order = require('./Models/Order.js');
var OrderItem = require('./Models/OrderItem.js');
var Address = require('./Models/DeliverAddress.js');
var BookRating = require('./Models/BookRating.js');
var session = require('express-session')
//app.use(express.static('images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(cors())
app.use('*', cors());
app.use(fileUpload());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
function loggedIn(req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
}
app.use(require('flash')());
app.use(express.static('public'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.set('view options', {
//     layout: false
// });
app.get('/', function (req, res) {
    res.render('login')
});
app.get('/dashboard', loggedIn, function (req, res) {

    Category.find().exec(function (err, category) {
        Book.find().exec(function (err, books) {
            PromoCode.find().exec(function (err, codes) {
                Order.find().sort({ _id: -1 }).limit(20)
                    .populate('order_Item').populate('promocode_id').populate('deliver_id').populate('user_id')
                    .exec(function (err, orders) {
                        var recordsData = orders
                        var removeIndex = recordsData.map(function (item) { return item.deliver_id; }).indexOf(null);
                        recordsData.splice(removeIndex, 2);
                        return res.render('Home/index',
                            {
                                _layoutFile: true,
                                categoryCount: category.length,
                                booksCount: books.length,
                                codesCount: codes.length,
                                ordersCount: orders.length,
                                order: recordsData,
                            });
                    });
            });
        });
    });
});
app.get('/login', function (req, res) { req.session.destroy(); res.render('login') });
app.get('/category', loggedIn, function (req, res) { res.render('Category/index', { _layoutFile: true, title: 'Category' }) });
app.get('/category/add', loggedIn, function (req, res) { res.render('Category/add', { _layoutFile: true, title: 'Category' }) });
app.get('/book', loggedIn, function (req, res) {
    Category.find({}, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.render('Book/index', { _layoutFile: true, records: data })
    });
});
app.get('/promocode', loggedIn, function (req, res) { res.render('PromoCode/index', { _layoutFile: true }) });
app.get('/promocode/add', loggedIn, function (req, res) { res.render('PromoCode/add', { _layoutFile: true }) });
app.get('/orders', loggedIn, function (req, res) { res.render('Order/index', { _layoutFile: true }) });

/**
 * Admin api start
 */
app.post('/api/admin/add', function (req, res) {
    var emailvalid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = req.body.email;
    var errorObj = {}
    if (!emailvalid.test(email)) {
        errorObj.email = "Email is not valid.";
    }
    if (Object.keys(errorObj).length) {
        errorObj.status = "error"
        var memberResponse = {
            status: errorObj.status,
        }
        return res.json({ status: 'NOK', result: { message: errorObj } });
    } else {
        var adminDetails = {
            email: req.body.email,
            password: req.body.password
        }
        Admin.create(adminDetails, function (err, record) {
            if (err) {
                return res.send({ 'error': err });
            }
            res.status(200).send({ status: 'OK', result: { record: record } });
        })
    }
});

app.post('/login', function (req, res) {
    //console.log('req.body', req.body)
    if (req.body.email && req.body.password) {
        Admin.findOne({ email: req.body.email, password: req.body.password }, function (err, record) {
            if (err) {
                return res.status(404).send({ err });
            }
            if (!record) {
                var userResponse = {
                    status: 'error',
                    message: "User or Password is wrong"
                }
                req.flash('error', 'Username or Password Wrong');
                res.redirect('/login');
            } else {
                req.session.authenticated = true;
                req.session.user = record
                res.redirect('/dashboard');
                req.flash('success', 'You have successfully logged in');
            }
        })
    } else {
        req.flash('error', 'Username and Password both Required');
        res.redirect('/login');
    }
});

/**
 * End
 */

/**
 * Category API start
 */
app.post('/category/add', loggedIn, function (req, res, next) {
    var sampleFile;
    var fileName;
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    sampleFile = req.files.sampleFile;
    fileName = req.files.sampleFile.name;
    let uploadpath = path.join(uploadDir, fileName);
    sampleFile.mv('./public/images/' + fileName, function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            var categoryDetails = {
                name: req.body.name,
                image: fileName
            }
            Category.create(categoryDetails, function (err, data) {
                if (err) {
                    return res.render('Category/add', { _layoutFile: true, error: err });
                }
                //res.send(data);
                res.redirect('/category')
            });
        }
    });
})

app.get('/api/all/category', function (req, res) {
    Category.find({}).sort({ 'name': 1 }).exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/get/category/:id', function (req, res) {
    Category.find({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/category/view/:id', loggedIn, function (req, res) {
    Category.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send(err);
        }
        res.render('Category/view', { _layoutFile: true, data: data });
    });
})

app.get('/category/delete/:id', function (req, res) {
    Category.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/category');
    });
})

app.route('/category/edit/:id', loggedIn)
    .get(function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                return res.send(err);
            }
            res.render('Category/edit', { _layoutFile: true, data: data })
        })
    })
    .post(function (req, res) {
        var sampleFile;
        var fileName;
        if (!req.files) { }
        if (req.files.sampleFile.name === '') {
            var categoryDetails = {
                name: req.body.name,
            }
            Category.update({ _id: req.params.id }, categoryDetails, function (err, data) {
                res.redirect('/category')
            });
        } else {
            sampleFile = req.files.sampleFile;
            if (req.files.sampleFile.name) {
                fileName = req.files.sampleFile.name;
            }
            fileName = req.files.sampleFile.name;
            let uploadpath = path.join(uploadDir, fileName);
            sampleFile.mv('./public/images/' + fileName, function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    var categoryDetails = {
                        name: req.body.name,
                        image: fileName
                    }
                    Category.update({ _id: req.params.id }, categoryDetails, function (err, data) {
                        res.redirect('/category')
                    });
                }
            });
        }
    })

app.get('/api/category/:page?/:perPage?', function (req, res) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 9;
    let pageNo = parseInt(req.params.page) || (typeof req.params.page !== 'undefined' ? parseInt(req.params.page) : DEFAULT_PAGE);
    let perPage = parseInt(req.params.perPage) || (typeof req.params.perPage !== 'undefined' ? parseInt(req.params.perPage) : DEFAULT_PER_PAGE);
    Category.find().exec(function (err, records) {
        if (err) {
            return res.status(404).send(err);
        }
        var count = records.length;
        var contPages = Math.ceil(count / perPage);
        var nextPageChek = (pageNo < contPages ? pageNo + 1 : false);
        var nextPageChekLink = (pageNo < contPages ? process.env.MORE_CATEGORY + 'api/category/' + nextPageChek + '/' + perPage : false);
        //if (pageNo > contPages || pageNo <= 0) return res.notFound({ message: "No page found." });
        var meta = {}
        var response = {}

        meta.page = pageNo;
        meta.perPage = perPage;
        meta.nextPage = nextPageChek;
        meta.pageCount = contPages;
        meta.totalRecords = count;
        meta.nextPageLink = nextPageChekLink;
        Category.find({})
            .skip((perPage * pageNo) - perPage)
            .limit(perPage)
            .sort({ "name": 1 })
            .exec(function (err, records) {
                response.meta = meta;
                response.data = records;
                res.send(response);
            });
    });
})

app.post('/category-list', loggedIn, function (req, res) {
    let pageNo = 1;
    let perPage = req.body.length;

    Category.find()
        .exec(function (err, records) {
            if (err) return res.send(err);
            if (records < 1) return res.send("No Category found.");
            var count = records.length;
            var orderby = req.body['order[0][column]']
            var dir = req.body['order[0][dir]']
            var order = {};
            if (orderby === '1') {
                order['name'] = dir
            }
            var start = parseInt(req.body.start);
            var length = parseInt(req.body.length);
            var categoryData = [];
            var searchCategory = new RegExp(req.body.name, "i");
            var count = 1;
            Category.find({ name: searchCategory })
                .skip(start).limit(length)
                .sort(order)
                .exec(function (err, records) {
                    records.forEach(function (categories) {
                        categoryData.push({
                            name: categories.name, _id: categories._id, count: count++,
                            button: "<a href='/category/view/" + categories._id + "'" + "class='btn btn-xs blue btn-outline' title='View'>" +
                                "<i class='fa fa-eye'></i>" + "View" +
                                "</a>" +
                                "<a href='/category/edit/" + categories._id + "'" + " class='btn btn-xs green btn-outline' title='Edit'>" +
                                "<i class='fa fa-edit'></i>" + "Edit" +
                                "</a>" +
                                "<a href='/category/delete/" + categories._id + "'" + "class='btn btn-xs red btn-outline' title='Delete' data-on-confirm='delete admin' data-toggle='confirmation'>" +
                                "<i class='fa fa-trash-o'></i>" + "Delete" +
                                "</a>",
                            image: "<img alt='' class='img-thumbline' src='/images/" + categories.image + "'" + " height='60' width='60 ' />"
                        });
                    });
                    var json = {
                        data: categoryData,
                        recordsTotal: count,
                        recordsFiltered: count
                    };
                    if (err) return res.send(err);
                    return res.json(json);
                });
        });
})
/**
 * Category API end
 */

/**
 * book API start
 */
app.route('/book/add', loggedIn)
    .get(function (req, res) {
        Category.find()
            .exec(function (err, records) {
                res.render('Book/add', { _layoutFile: true, records: records })
            })
    })
    .post(function (req, res) {
        var sampleFile;
        var fileName;
        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }
        sampleFile = req.files.sampleFile;
        fileName = req.files.sampleFile.name;
        let uploadpath = path.join(uploadDir, fileName);
        sampleFile.mv('./public/images/' + fileName, function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                var bookDetails = {
                    title: req.body.title,
                    price: req.body.price,
                    publisher: req.body.publisher,
                    pages: req.body.pages,
                    isbn_13: req.body.isbn_13,
                    isbn_10: req.body.isbn_10,
                    author: req.body.author,
                    desc: req.body.desc,
                    cate_id: req.body.cate_id,
                    image: fileName,
                    //offer: req.body.offer
                }
                Book.create(bookDetails, function (err, records) {
                    if (err) {
                        return res.render('Book/add', { _layoutFile: true, error: err, records: records });
                    }
                    //res.send(data);
                    res.redirect('/book')
                });
            }
        });
    })

app.get('/book/view/:id', loggedIn, function (req, res) {
    Book.findOne({ _id: req.params.id }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send(err);
        }
        res.render('Book/view', { _layoutFile: true, data: data });
    });
})

app.get('/book/delete/:id', function (req, res) {
    Book.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send(err);
        }
        res.redirect('/book');
    });
})

app.route('/book/edit/:id', loggedIn)
    .get(function (req, res) {
        Category.find()
            .exec(function (err, records) {
                Book.findOne({ _id: req.params.id }, function (err, data) {
                    if (err) {
                        return res.send(err);
                    }
                    res.render('Book/edit', { _layoutFile: true, data: data, records: records })
                })
            })
    })
    .post(function (req, res) {
        var sampleFile;
        var fileName;
        if (!req.files) { }
        var bookDetails = {
            title: req.body.title,
            price: req.body.price,
            publisher: req.body.publisher,
            pages: req.body.pages,
            isbn_13: req.body.isbn_13,
            isbn_10: req.body.isbn_10,
            author: req.body.author,
            desc: req.body.desc,
            cate_id: req.body.cate_id,
            //image: fileName,
        }
        if (req.files.sampleFile.name === '') {
            Book.update({ _id: req.params.id }, bookDetails, function (err, data) {
                res.redirect('/book')
            });
        } else {
            sampleFile = req.files.sampleFile;
            if (req.files.sampleFile.name) {
                fileName = req.files.sampleFile.name;
            }
            fileName = req.files.sampleFile.name;
            let uploadpath = path.join(uploadDir, fileName);
            sampleFile.mv('./public/images/' + fileName, function (err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    bookDetails.image = fileName
                    Book.update({ _id: req.params.id }, bookDetails, function (err, data) {
                        res.redirect('/book')
                    });
                }
            });
        }
    })

app.post('/api/update/books', function (req, res) {
    Book.find().exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        var update = {
            offer: req.body.offer
        }
        Book.update({}, update, { multi: true }, function (err, data) {
            res.send(data);
        })
    });
})

app.get('/api/categorybooks/:cate_id', function (req, res) {
    var id = req.params.cate_id;
    Book.find({ cate_id: id }).sort({ 'title': 1 }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/books/hightolow/:cate_id', function (req, res) {
    var id = req.params.cate_id;
    Book.find({ cate_id: id }).sort({ price: -1 }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/books/lowtohigh/:cate_id', function (req, res) {
    var id = req.params.cate_id;
    Book.find({ cate_id: id }).sort({ price: 1 }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/books/latest/:cate_id', function (req, res) {
    var id = req.params.cate_id;
    Book.find({ cate_id: id }).sort({ _id: -1 }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/book/:bookId', function (req, res) {
    var id = req.params.bookId;
    Book.find({ _id: id }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.get('/api/search/book/:query', function (req, res) {
    var bookQuery = new RegExp(req.params.query, 'i');
    Book.find({ title: bookQuery }).populate('cate_id').exec(function (err, data) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).send(data);
    });
})

app.post('/book-list', loggedIn, function (req, res) {
    let pageNo = 1;
    let perPage = req.body.length;
    Book.find().populate('cate_id')
        .exec(function (err, records) {
            if (err) return res.send(err);
            if (records < 1) return res.send("No Book found.");
            var count = records.length;
            var orderby = req.body['order[0][column]']
            var dir = req.body['order[0][dir]']
            var order = {};
            if (orderby === '2') {
                order['title'] = dir
            } else if (orderby === '3') {
                order['author'] = dir
            } else if (orderby === '4') {
                order['publisher'] = dir
            } else if (orderby === '7') {
                order['price'] = dir
            }
            var start = parseInt(req.body.start);
            var length = parseInt(req.body.length);
            var bookData = [];
            var searchBook = new RegExp(req.body.title, "i");
            var searchAuthor = new RegExp(req.body.author, "i");
            var searchPublisher = new RegExp(req.body.publisher, "i");
            var cateId = new RegExp(req.body.cate_id, "i");
            var count = 1;
            Book.find({ title: searchBook, author: searchAuthor, publisher: searchPublisher, cate_id: cateId })
                .populate('cate_id')
                .skip(start).limit(length)
                .sort(order)
                .exec(function (err, records) {
                    records.forEach(function (books) {
                        bookData.push({
                            count: count++,
                            title: books.title, _id: books._id, price: books.price, publisher: books.publisher, pages: books.pages,
                            isbn_13: books.isbn_13, isbn_10: books.isbn_10, author: books.author, category: books.cate_id.name,
                            desc: "<textarea>'" + books.desc + "'</textarea>",
                            button: "<a href='/book/view/" + books._id + "'" + "class='btn btn-xs blue btn-outline' title='View'>" +
                                "<i class='fa fa-eye'></i>" + "View" +
                                "</a>" +
                                "<a href='/book/edit/" + books._id + "'" + " class='btn btn-xs green btn-outline' title='Edit'>" +
                                "<i class='fa fa-edit'></i>" + "Edit" +
                                "</a>" +
                                "<a href='/book/delete/" + books._id + "'" + "class='btn btn-xs red btn-outline' title='Delete' data-on-confirm='delete admin' data-toggle='confirmation'>" +
                                "<i class='fa fa-trash-o'></i>" + "Delete" +
                                "</a>",
                            image: " <img alt='' class='img-thumbline' src='/images/" + books.image + "'" + " height='60' width='60 ' />"
                        });
                    });
                    var json = {
                        data: bookData,
                        recordsTotal: count,
                        recordsFiltered: count
                    };
                    if (err) return res.send(err);
                    return res.json(json);
                });
        });
});
/**
 * book API end
 */

/**
 * Cart API start
 */
app.post('/api/add/cart', function (req, res) {
    var cartdata = {
        book_id: req.body.book_id,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        user: req.body.user,
        status: "Confirmed",
        quantity: req.body.quantity,
        offer: req.body.offer
    }
    Cart.findOne({ book_id: req.body.book_id, user: req.body.user }).exec(function (err, data) {
        if (err) {
            return res.send(err);
        }
        if (!data) {
            Cart.create(cartdata, function (err, data) {
                if (err) {
                    return res.send(err);
                }
                return res.send(data);
            })
        } else {
            return res.json({ status: 'NOK', result: { message: 'This item is already added' } })
        }
    });
})

app.put('/api/update/cart/:id', function (req, res) {
    var id = req.params.id;
    Cart.find({ _id: id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        var updateData = {
            quantity: req.body.count
        }
        Cart.update({ _id: id }, updateData, function (err, data) {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({ status: 'OK', result: { data: data } });
        })
    });
})

app.get('/api/cart/:user', function (req, res) {
    var user = req.params.user;
    Cart.find({ user: user }).populate('book_id').exec(function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.send(data);
    });
})

app.delete('/api/cart/:cart_id', function (req, res) {
    var id = req.params.cart_id;
    Cart.remove({ _id: id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.status(200).send({ status: 'OK', result: { data: data } });
    });
})
/**
 * cart API End
 */

/**
 * User API start
 */
app.post('/api/signup', function (req, res) {
    var emailvalid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = req.body.email;
    var errorObj = {}
    if (!emailvalid.test(email)) {
        errorObj.email = "Email is not valid.";
    }
    if (Object.keys(errorObj).length) {
        errorObj.status = "error"
        var memberResponse = {
            status: errorObj.status,
        }
        return res.json({ status: 'NOK', result: { message: errorObj } });
    } else {
        var userDetails = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(userDetails, function (err, record) {
            if (err) {
                return res.send({ 'error': err });
            }
            res.status(200).send({ status: 'OK', result: { record: record } });
        })
    }
});

app.post('/api/login', function (req, res) {
    //console.log('req',req.body)
    if (req.body.email && req.body.password) {
        User.findOne({ email: req.body.email, password: req.body.password }, function (err, record) {
            if (err) {
                return res.status(404).send({ err });
            }
            if (!record) {
                var userResponse = {
                    status: 'error',
                    message: "User or Password is wrong"
                }
                return res.json({ status: 'NOK', result: { message: userResponse.message } })
            } else {
                return res.status(200).json({ status: 'OK', result: { record: record } })
            }
        })
    } else {
        return res.send({ message: "required parameter : email and password" });
    }
});

app.post('/api/update-password/:id', function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function (err, record) {
        var old_password = record.password;
        var oldpassword = req.body.oldpassword;
        var new_password = req.body.newpassword;
        var confirm_password = req.body.confirmpassword;
        var errorObj = {};
        if (!oldpassword.match(old_password)) {
            errorObj.oldpassword = "Old password should be correct";
        }
        if (!confirm_password.match(new_password)) {
            errorObj.confirm_password = "Confirm password should match to new one";
        }
        if (Object.keys(errorObj).length) {
            errorObj.status = "error"
            var Response = {
                status: errorObj.status,
            }
            return res.json({ status: 'NOK', result: { message: errorObj } });
        } else {
            var passwordUpdate = {
                password: new_password
            }
            User.update({ _id: id }, passwordUpdate, function (err, record) {
                if (err) {
                    return res.send(err)
                }
                return res.json({ status: 'OK', result: { message: "Password Updated Successfully" } })
            })
        }
    });
});
/**
 * User API end
 */
/**
 * Order Api start
 */

app.post('/api/order/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    if (req.body.address && req.body.order) {
        var address = {
            name: req.body.address.name,
            phone_number: req.body.address.phone_number,
            pincode: req.body.address.pincode,
            city: req.body.address.city,
            address: req.body.address.address,
            state: req.body.address.state,
            user_id: user_id,
            is_deleted: 'false'
        }
        var orderItem = {
            order: req.body.order,
            status: 'Confirmed',
            user_id: user_id
        }
        if (req.body.address.address_id) {
            //OrderItem.create(orderItem, function (err, order) {
            var date = new Date();
            var orderData = {
                date: date,
                user_id: user_id,
                deliver_id: req.body.address.address_id,
                order_Item: req.body.order,
                //totalprice: req.body.totalPrice,
                payment: req.body.payment,
                charge_id: req.body.chargeid,
                promocode_id: req.body.promocode_id
            }
            Order.create(orderData, function (err, records) {
                if (err) {
                    return res.send({ err });
                }
                if (!records) {
                    return res.status(200).json({ status: 'NOK' })
                } else {
                    return res.status(200).json({ status: 'OK', result: { records: records } })
                }

            })
        } else {
            Address.create(address, function (err, data) {
                // OrderItem.create(orderItem, function (err, order) {
                var date = new Date();
                var orderData = {
                    date: date,
                    user_id: user_id,
                    deliver_id: data._id,
                    order_Item: req.body.order,
                    //totalprice: req.body.totalPrice,
                    payment: req.body.payment,
                    charge_id: req.body.chargeid,
                    promocode_id: req.body.promocode_id
                }
                Order.create(orderData, function (err, records) {
                    if (err) {
                        return res.send({ err });
                    }
                    return res.status(200).json({ status: 'OK', result: { records: records } })
                })
            })
        }
    } else {
        return res.send({ status: 'NOK' })
    }
});

app.get('/api/user/order/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    Order.find({ user_id: user_id }).sort({ _id: -1 }).populate('deliver_id').populate('promocode_id').populate('order_Item').exec(function (err, data) {
        if (err) {
            return res.status(404).send({ err });
        }
        return res.status(200).json({ status: 'OK', result: { data: data } })
    });
});

app.get('/api/order/:orderId', function (req, res) {
    var id = req.params.orderId;
    Order.find({ _id: id }).populate('deliver_id').populate('order_Item').populate('promocode_id').exec(function (err, data) {
        if (err) {
            return res.status(404).send({ err });
        }
        return res.status(200).json({ status: 'OK', result: { data: data } });
    });
});

app.route('/orders/view/:id')
    .get(loggedIn, function (req, res) {
        Order.findOne({ _id: req.params.id }).populate('user_id')
            .populate('deliver_id').populate('order_Item').populate('promocode_id').exec(function (err, data) {
                if (err) {
                    return res.status(404).send({ err });
                }
                res.render('Order/view', { _layoutFile: true, data: data })
            });
    })

    .post(loggedIn, function (req, res) {
        Order.findOne({ _id: req.params.id }).populate('user_id')
            .populate('deliver_id').populate('order_Item').populate('promocode_id').exec(function (err, records) {
                if (err) {
                    return res.status(404).send({ err });
                }
                OrderItem.findOne({ _id: records.order_Item._id }, function (err, data) {
                    var status;
                    if (req.body.order_status === '2') {
                        status = 'Shipped';
                    } else if (req.body.order_status === '3') {
                        status = 'Delivered';
                    } else if (req.body.order_status === '1') {
                        status = 'Packed';
                    } else if (req.body.order_status === '4') {
                        status = 'Returned';
                    }
                    for (var i = 0; i < data.order.length; i++) {
                        data.status = status
                        data.order[i].status = status;
                    }
                    OrderItem.update({ _id: records.order_Item._id }, data, function (err, response) {
                        if (err) {
                            return res.send(err);
                        }
                        res.redirect('/orders/view/' + records._id)
                    })
                });

            });
    });

app.route('/orders/view/:id/:itemid')
    // .get(loggedIn, function (req, res) {
    //     Order.findOne({ _id: req.params.id }).populate('user_id')
    //         .populate('deliver_id').populate('order_Item').populate('promocode_id').exec(function (err, data) {
    //             if (err) {
    //                 return res.status(404).send({ err });
    //             }
    //             res.render('Order/view', { _layoutFile: true, data: data })
    //         });
    // })

    .post(loggedIn, function (req, res) {
        Order.findOne({ _id: req.params.id }).populate('user_id')
            .populate('deliver_id').populate('order_Item').populate('promocode_id').exec(function (err, records) {
                if (err) {
                    return res.status(404).send({ err });
                }
                var itemId = req.params.itemid;
                OrderItem.findOne({ _id: records.order_Item._id }, function (err, data) {
                    var cancel = [];
                    if (req.body.order_status === '4') {
                        for (var i = 0; i < data.order.length; i++) {
                            if (data.order[i]._id === itemId) {
                                data.order[i].status = 'Returned';
                            }
                            if (data.order.length > 1) {
                                if (data.order[i].status === 'Returned') {
                                    cancel.push(data.order[i].status)
                                }
                                if (cancel.length === data.order.length) {
                                    data.status = "Returned"
                                }
                            } else {
                                data.status = "Returned"
                            }
                        }
                    }
                    OrderItem.update({ _id: records.order_Item._id }, data, function (err, response) {
                        if (err) {
                            return res.send(err);
                        }
                        res.redirect('/orders/view/' + records._id)
                    })
                });

            });
    });

app.get('/orders/delete/:id', function (req, res) {
    Order.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.redirect('/orders');
    });
})

app.get('/api/update/order_status/:orderId/', function (req, res) {

    var orderId = req.params.orderId;
    var itemId = req.params.itemId;
    OrderItem.findOne({ _id: orderId }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        for (var i = 0; i < data.order.length; i++) {
            data.status = "Cancelled"
            data.order[i].status = 'Cancelled';

        }
        OrderItem.update({ _id: orderId }, data, function (err, response) {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({ status: 'OK', result: { data: response } });
        })
    })

});

app.get('/api/update/item_status/:orderId/:itemId', function (req, res) {

    var orderId = req.params.orderId;
    var itemId = req.params.itemId;
    OrderItem.findOne({ _id: orderId }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        var cancel = [];
        for (var i = 0; i < data.order.length; i++) {
            if (data.order[i]._id === itemId) {
                data.order[i].status = 'Cancelled';
            }
            if (data.order.length > 1) {
                if (data.order[i].status === 'Cancelled') {
                    cancel.push(data.order[i].status)
                }
                if (cancel.length === data.order.length) {
                    data.status = "Cancelled"
                }
            } else {
                data.status = "Cancelled"
            }
        }
        OrderItem.update({ _id: orderId }, data, function (err, response) {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({ status: 'OK', result: { data: response } });
        })
    })

});

app.get('/api/return_order/:orderId', function (req, res) {
    var orderId = req.params.orderId;
    var itemId = req.params.itemId;
    OrderItem.findOne({ _id: orderId }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        for (var i = 0; i < data.order.length; i++) {
            data.return_request = "YES"
            data.order[i].item_return_request = 'YES';

        }
        OrderItem.update({ _id: orderId }, data, function (err, response) {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({ status: 'OK', result: { data: response } });
        })
    })
});

app.get('/api/return_item/:orderId/:itemId', function (req, res) {

    var orderId = req.params.orderId;
    var itemId = req.params.itemId;
    OrderItem.findOne({ _id: orderId }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        var cancel = [];
        for (var i = 0; i < data.order.length; i++) {
            if (data.order[i]._id === itemId) {
                data.order[i].item_return_request = 'YES';
            }
            if (data.order.length > 1) {
                if (data.order[i].item_return_request === 'YES') {
                    cancel.push(data.order[i].item_return_request)
                }
                if (cancel.length === data.order.length) {
                    data.return_request = "YES"
                }
            } else {
                data.return_request = "YES"
            }
        }
        OrderItem.update({ _id: orderId }, data, function (err, response) {
            if (err) {
                return res.send(err);
            }
            res.status(200).send({ status: 'OK', result: { data: response } });
        })
    })
});

app.post('/order-list', loggedIn, function (req, res) {
    let pageNo = 1;
    let perPage = req.body.length;

    Order.find()
        .populate('deliver_id').populate('order_Item').populate('promocode_id').populate('user_id')
        .exec(function (err, records) {
            if (err) return res.send(err);
            if (records < 1) return res.send("No Order found.");
            var count = records.length;
            var orderby = req.body['order[0][column]']
            var dir = req.body['order[0][dir]']
            var order = {};
            if (orderby === '1') {
                order['name'] = dir
            }
            var start = parseInt(req.body.start);
            var length = parseInt(req.body.length);
            var orderData = [];
            var searchCategory = new RegExp(req.body.name, "i");
            var count = 1;
            Order.find({})
                .populate('deliver_id').populate('order_Item').populate('promocode_id').populate('user_id')
                .skip(start).limit(length)
                .sort(order)
                .exec(function (err, records) {
                    var recordsData = records
                    var removeIndex = recordsData.map(function (item) { return item.deliver_id; }).indexOf(null);
                    recordsData.splice(removeIndex, 2);
                    recordsData.forEach(function (orders) {
                        var address = orders.deliver_id.name + ',' + orders.deliver_id.phone_number + ',' +
                            orders.deliver_id.address + orders.deliver_id.pincode + ',' + orders.deliver_id.city + ',' +
                            orders.deliver_id.state;

                        orderData.push({
                            count: count++,
                            user: orders.user_id.name, address: address, payment: orders.payment, totalprice: orders.order_Item.totalPrice,
                            orderItem: orders.order_Item.order.length + '(items)', date: orders.date,
                            button: "<a href='/orders/view/" + orders._id + "'" + "class='btn btn-xs blue btn-outline' title='View'>" +
                                "<i class='fa fa-eye'></i>" + "View" +
                                "</a>" +
                                "<a href='/orders/delete/" + orders._id + "'" + "class='btn btn-xs red btn-outline' title='Delete' data-on-confirm='delete admin' data-toggle='confirmation'>" +
                                "<i class='fa fa-trash-o'></i>" + "Delete" +
                                "</a>",
                        });
                        // } else {
                        //     console.log('###############')
                        //     console.log('order', orders)
                        //     console.log('order', orders.totalprice)
                        //     console.log('order', orders.order_Item.length)
                        //     orderData.push({
                        //         count: count++,
                        //         user: orders.user_id.name, address: '', payment: orders.payment, totalprice: orders.totalprice + '100',
                        //         orderItem: orders.order_Item.length + '(items)', date: orders.date,
                        //         button: "<a href='/orders/view/" + orders._id + "'" + "class='btn btn-xs blue btn-outline' title='View'>" +
                        //             "<i class='fa fa-eye'></i>" + "View" +
                        //             "</a>" +
                        //             "<a href='/orders/delete/" + orders._id + "'" + "class='btn btn-xs red btn-outline' title='Delete' data-on-confirm='delete admin' data-toggle='confirmation'>" +
                        //             "<i class='fa fa-trash-o'></i>" + "Delete" +
                        //             "</a>",
                        //     });
                        // }
                    });
                    var json = {
                        data: orderData,
                        recordsTotal: count,
                        recordsFiltered: count
                    };
                    if (err) return res.send(err);
                    return res.json(json);
                });
        });
})

/**
 * End
 */
/**
 * AddressApi
 */
app.post('/api/deliveryaddress/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var address = {
        name: req.body.name,
        phone_number: req.body.phone_number,
        pincode: req.body.pincode,
        city: req.body.city,
        address: req.body.address,
        state: req.body.state,
        user_id: user_id
    }
    Address.create(address, function (err, data) {
        if (err) {
            return res.status(404).send({ err });
        }
        return res.status(200).json({ status: 'OK', result: { data: data } })
    })
});

app.get('/api/user/deliveryaddress/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    Address.find({ user_id: user_id }).sort({ _id: -1 }).exec(function (err, data) {
        if (err) {
            return res.status(404).send({ err });
        }
        return res.status(200).json({ status: 'OK', result: { data: data } })
    })
});

app.post('/api/remove/user/address/:id', function (req, res) {
    var id = req.params.id;
    var deleted = {
        is_deleted: 'true'
    }
    Address.update({ _id: id }, deleted, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.status(200).send({ status: 'OK', result: { data: data } });
    });
})

app.post('/api/update/user/address/:id', function (req, res) {
    var id = req.params.id;
    Address.update({ _id: id }, req.body, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.status(200).send({ status: 'OK', result: { data: data } });
    });
})

/**
 * End
 */

/**
 * OrderItem Api
 */

app.post('/api/orderItem/:user_id', function (req, res) {
    var orderItemId = req.body.orderItemId;
    var user_id = req.params.user_id;
    var items = {
        order: req.body.order_items,
        status: 'Confirmed',
        user_id: user_id,
        totalPrice: req.body.totalprice,
        promocode_id: req.body.promocode_id,
        return_request: 'NO'
    }
    OrderItem.findOne({ _id: orderItemId }).exec(function (err, data) {
        if (!data) {
            OrderItem.create(items, function (err, data) {
                if (err) {
                    return res.send(err);
                }
                return res.status(200).json({ status: 'OK', result: data })
            })
        } else {
            var orderItems = {
                order: req.body.order_items,
                promocode_id: req.body.promocode_id
            }
            OrderItem.update({ _id: orderItemId }, items, function (err, data) {
                if (err) {
                    return res.send(err);
                }
                return res.status(200).json({ status: 'OK', result: { _id: orderItemId } })
            })
        }
    });
});

app.get('/api/get/orderItem/:id', function (req, res) {
    if (req.params.id) {
        var orderItemId = req.params.id;
        OrderItem.findOne({ _id: orderItemId }).populate('promocode_id').exec(function (err, data) {
            if (err) {
                return res.status(404).send({ err });
            }
            return res.status(200).send(data)
        })
    }
});

/**
 * End
 */

/**
 * wishlist api
 */

app.post('/api/user/wishlist', function (req, res) {
    var dataItem = {
        book_id: req.body.book_id,
        user_id: req.body.user
    }
    console.log(dataItem)
    WishList.findOne({ book_id: req.body.book_id }).exec(function (err, data) {
        if (err) {
            return res.send(err);
        }
        if (!data) {
            WishList.create(dataItem, function (err, dataItem) {
                if (err) {
                    return res.send(err)
                }
                res.json({ status: 'OK' });
            })
        } else {
            return res.json({ status: 'NOK' });
        }
    });
});

app.get('/api/get/user/wishlist/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    WishList.find({ user_id: user_id }).populate('user_id').populate('book_id').exec(function (err, data) {
        if (err) {
            return res.status(404).send({ err });
        }
        return res.status(200).json({ status: 'OK', result: { data: data } })
    });
});

app.delete('/api/remove/user/wishlist/:id', function (req, res) {
    var id = req.params.id;
    WishList.remove({ _id: id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.status(200).send({ status: 'OK', result: { data: data } });
    });
});

/**
 * Wishlist api end
 */
/**
 * payment gateway
 */
app.post('/api/save-stripe-token', function (req, res) {
    stripe.charges.create(req.body, function (err, charge) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).json({ response: charge });
        }
    });
});

app.post('/api/refund/:chargeid/:price', function (req, res) {
    var charge = req.params.chargeid;
    stripe.refunds.create({
        charge: charge,
        amount: req.params.price
    }, function (err, refund) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).json({ response: refund.status });
        }
    });
});

app.post('/api/refund_order/:chargeid/:price', function (req, res) {
    var charge = req.params.chargeid;
    stripe.refunds.create({
        charge: charge,
        amount: req.params.price
    }, function (err, refund) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).json({ response: refund.status });
        }
    });
});

/**
 * End
 */
/**
 * promocode api start
 */
app.post('/promocode/add', loggedIn, function (req, res) {
    var promoCodeData = {
        name: req.body.name,
        description: req.body.description,
        discount: req.body.discount,
        amount: req.body.amount
    }
    PromoCode.create(promoCodeData, function (err, data) {
        if (err) {
            return res.render('Promocode/add', { _layoutFile: true, error: err });
        } else {
            res.redirect('/promocode')
        }
    })
});

app.get('/api/coupon', function (req, res) {
    PromoCode.find({}, function (err, data) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.status(200).json({ response: data });
        }
    })
});

app.get('/promocode/view/:id', loggedIn, function (req, res) {
    PromoCode.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.status(500).send({ error: err });
        } else {
            res.render('Promocode/view', { _layoutFile: true, data: data })
        }
    })
});

app.route('/promocode/edit/:id', loggedIn)
    .get(function (req, res) {
        PromoCode.findOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                return res.send(err);
            }
            res.render('Promocode/edit', { _layoutFile: true, data: data })
        })
    })
    .post(function (req, res) {
        var promoCodeData = {
            name: req.body.name,
            description: req.body.description,
            discount: req.body.discount,
            amount: req.body.amount
        }
        PromoCode.update({ _id: req.params.id }, promoCodeData, function (err, data) {
            res.redirect('/promocode');
        });
    })

app.get('/promocode/delete/:id', function (req, res) {
    PromoCode.remove({ _id: req.params.id }, function (err, data) {
        if (err) {
            return res.send('error', err);
        }
        res.redirect('/promocode');
    });
})

app.post('/api/valid/coupon', function (req, res) {
    PromoCode.findOne({ name: req.body.promocode, amount: { $lte: req.body.amount } }, function (err, data) {
        if (err) {
            res.status(500).send({ error: err });
        }
        if (data) {
            return res.status(200).json({ status: 'OK', message: 'Applied Successfully', response: data });
        }
        else {
            return res.json({ status: 'NOK', message: 'Please enter valid promocode' })
        }
    })
});

app.post('/promocode-list', loggedIn, function (req, res) {
    let pageNo = 1;
    let perPage = req.body.length;

    PromoCode.find()
        .exec(function (err, records) {
            if (err) return res.send(err);
            if (records < 1) { return res.send("No Coupon available."); }
            var count = records.length;
            var orderby = req.body['order[0][column]']
            var dir = req.body['order[0][dir]']
            var order = {};
            if (orderby === '1') {
                order['name'] = dir
            }
            if (orderby === '3') {
                order['amount'] = dir
            }
            if (orderby === '4') {
                order['discount'] = dir
            }
            var start = parseInt(req.body.start);
            var length = parseInt(req.body.length);
            var promocodeData = [];
            var searchCode = new RegExp(req.body.name, "i");
            var count = 1;
            PromoCode.find({ name: searchCode })
                .skip(start).limit(length)
                .sort(order)
                .exec(function (err, records) {
                    records.forEach(function (code) {
                        promocodeData.push({
                            count: count++,
                            name: code.name, _id: code._id, description: code.description, amount: code.amount,
                            discount: code.discount,
                            button: "<a href='/promocode/view/" + code._id + "'" + "class='btn btn-xs blue btn-outline' title='View'>" +
                                "<i class='fa fa-eye'></i>" + "View" +
                                "</a>" +
                                "<a href='/promocode/edit/" + code._id + "'" + " class='btn btn-xs green btn-outline' title='Edit'>" +
                                "<i class='fa fa-edit'></i>" + "Edit" +
                                "</a>" +
                                "<a href='/promocode/delete/" + code._id + "'" + "class='btn btn-xs red btn-outline' title='Delete' data-on-confirm='delete admin' data-toggle='confirmation'>" +
                                "<i class='fa fa-trash-o'></i>" + "Delete" +
                                "</a>",
                        });
                    });
                    var json = {
                        data: promocodeData,
                        recordsTotal: count,
                        recordsFiltered: count
                    };
                    if (err) return res.send(err);
                    return res.json(json);
                });
        });
})
/**
 * End
 */
/**
 * Rating api start
 */
app.post('/api/review-rating', function (req, res) {
    var ratingData = {
        user_id: req.body.user_id,
        book_id: req.body.book_id,
        rate: req.body.rate,
        comment: req.body.comment,
        title: req.body.title
    }
    BookRating.findOne({ user_id: req.body.user_id, book_id: req.body.book_id }, function (err, data) {
        if (!data) {
            BookRating.create(ratingData, function (err, data) {
                if (err) {
                    res.status(500).send({ error: err });
                }
                return res.status(200).json({ status: 'OK', message: "Your Rating has been saved", response: data });
            })
        } else {
            if (req.body.comment && req.body.title != undefined) {
                var updateRate = {
                    rate: req.body.rate,
                    comment: req.body.comment,
                    title: req.body.title
                }
            } else {
                var updateRate = {
                    rate: req.body.rate,
                }
            }
            BookRating.update({ _id: data._id }, updateRate, function (err, data) {
                return res.status(200).json({ status: 'OK', message: "Your Rating has been updated", response: data });
            })
        }
    })
});

app.get('/api/get/review-rating/:book_id', function (req, res) {
    BookRating.find({ book_id: req.params.book_id }).sort({ _id: -1 }).populate('user_id').exec(function (err, data) {
        if (err) {
            res.status(500).send({ error: err });
        }
        return res.status(200).json({ status: 'OK', response: data });
    })
});
/**
 * End
 */
var server = app.listen(process.env.PORT, function () {
});