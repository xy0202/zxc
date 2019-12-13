// 1 发送ajax 请求一共多少条数据 
// const getData = function() {
//         return new Promise(function(resolve, reject) {
// jsonp("../../data/1.json", cb, data)


// ajaxGet('../../data/1.json', function(res) {
//     res = JSON.parse(res)
//     console.log(res)http://localhost/zxy/data/goods.json
//         // that.display();
// })
// ajaxGet('http://localhost/', (res) => {
//     res = JSON.parse(res);
//     console.log(res)
// })
jsonp('http://localhost/zxy/flow/data/2.json', (res) => {
        res = JSON.parse(res);
        console.log(res)
    })
    // async function fun() {
    //     let data = await getData();
    //     console.log(data);
    //     // 获取元素
    //     let container = document.querySelector(".container");
    //     // 初始化分页结构
    //     let p = new Pagination(container, {
    //         pageInfo: {
    //             currentPage: 1,
    //             // 一共多少数据
    //             totalSize: data.data.length,
    //             // 一页显示多少数据
    //             pageSize: 8,
    //             // 一共多少页
    //             totalPage: Math.ceil(data.data.length / 8)
    //         },
    //         // 定义文本信息
    //         textInfo: {
    //             first: "首页",
    //             prev: "上一页",
    //             next: "下一页",
    //             last: "末页"
    //         },
    //         data: data.data
    //     });

// }
// let p = fun();
// p.then(function() {
//         console.log("执行完毕");
//     })
//     .catch(function(err) {
//         console.log(err)
//         console.log("报错了");
//     })
// 2 把分页组件渲染
// 3 默认显示前xxx条

// var data = [];

// ajaxGet('../data/goods.json', (res) => {
//     res = JSON.parse(res);
//     data.push(res)

//     function display() {

//     }

// })

class Car {
    constructor() {
        this.url = "../data/2.json";
        this.tbody = document.getElementsByClassName("row")[0];
        console.log(this.tbody)
        this.load()
    }
    load() {
        ajaxGet(this.url, (res) => {
            this.res = JSON.parse(res);
            this.display();
        })
    }

    display() {
        var str = "";
        console.log(this.res)
        for (var i = 0; i < this.res.length; i++) {

            str += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 ccc">
            <img src="https://img01.hua.com/uploadpic/newpic/${this.res[i].ItemCode}.jpg_220x240.jpg" class="img-responsive" alt="Responsive image" />
            
            <div class="desc">
                ${this.res[i].Cpmc}
            </div>

            <div class="price">
                <i class="glyphicon glyphicon-yen"></i>
                <span class="">${this.res[i].Price}</span>
            </div>
            <div class="clearfix">
                <a href="./pages/cart.html" class="pull-left">去购物车</a>
                <a href="./detail.html?id=${this.res[i].id}" class="pull-right">查看详情</a>
            </div></div>`;


        }

        console.log(this.tbody)
        this.tbody.innerHTML = str;
    }
}

new Car;