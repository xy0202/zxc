var search = window.location.search;
// var row = document.querySelector(".row");
var row = document.getElementsByClassName("row")
// 截取 
var Id = search.split("=")[1];
console.log(Id);
jsonp('http://localhost/zxy/flow/data/2.json', (res) => {
        res = JSON.parse(res);
        console.log(res); 
        console.log(res[Id]);        
})
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
      console.log(this.res[Id]); 
      var res = this.res[Id-1]

          str = ` <div class="box">

          <div class="show">
            <img src="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg" alt="">
            <div class="mask"></div>
          </div>
          <div class="list">
            <p class="active">
              <img
                src="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                showImg="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                enlargeImg="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                alt="">
            </p>
            <p>
              <img
                src="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                showImg="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                enlargeImg="https://img01.hua.com/uploadpic/newpic/${res.ItemCode}.jpg_220x240.jpg"
                alt="">
            </p>
          </div>
       
  <div class="enlarge"></div>
</div>
<div class="media">
  <div class="media-body">
      <h4 class="media-heading">浪漫心情--${res.Instro}</h4>
      <h5>火热玫瑰  幸福告白</h5>
      <div class="box1">
          <p>类 别：鲜花编号：${res.ItemCode}</p>
          <p>材 料： ${res.Instro}</p>
          <p>包 装： 深灰色opp雾面纸2张，酒红色宽缎带1.5米</p>
          <p>华 语： 铺满玫瑰的夜里，有温暖的告白在等待，来我的怀里，拥抱我的爱，把你的热情摊开，我会一直都在！</p>
          <p>附 送： 下单填写留言，即免费赠送精美贺卡！</p>
          <p>配 送： 全国 （可配送至全国2000多城市，市区免配送费）</p>
          </div>
      <div class="price">
          <i>花礼价：</i>
          <span class="">￥${res.Price}</span>
      </div>
     
      <div class="">
          <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-default aa" name="buynow">立即购买</button>
              <button type="button" class="btn btn-default bb" name="addCart">加入购物车</button>
          </div>
      </div>
  </div>
</div>
`;
      console.log(this.tbody)
      this.tbody.innerHTML = str;

      class Enlarge {
        constructor (ele) {
          this.ele = ele
      
          // 获取一下 show 盒子
          this.show = this.ele.querySelector('.show')
      
          // 获取遮罩层盒子
          this.mask = this.ele.querySelector('.mask')
      
          // 获取放大镜盒子
          this.enlarge = this.ele.querySelector('.enlarge')
      
          // 获取list 盒子
          this.list = this.ele.querySelector('.list')
      
          // 所有 p 标签的盒子
          this.p = this.list.children
      
          this.init()
        }
      
        init () {
          this.overOut()
          this.setScale()
          this.move()
          this.change()
        }
      
        // 1. 鼠标移入移出事件
        overOut () {
          this.show.addEventListener('mouseover', () => this.mask.style.display = this.enlarge.style.display = 'block')
          this.show.addEventListener('mouseout', () => this.mask.style.display = this.enlarge.style.display = 'none')
        }
      
        // 2. 调整一下放大镜盒子的比例
        setScale () {
          // 获取 mask 的尺寸
          const maskX = parseInt(getStyle(this.mask, 'width'))
          const maskY = parseInt(getStyle(this.mask, 'height'))
      
          // show 盒子的尺寸
          const showX = this.show.clientWidth
          const showY = this.show.clientHeight
      
          // 背景图的尺寸
          const bgX = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[0])
          const bgY = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[1])
      
          // 放大镜盒子的尺寸
          const enlargeX = maskX * bgX / showX
          const enlargeY = maskY * bgY / showY
      
          this.enlarge.style.width = enlargeX + 'px'
          this.enlarge.style.height = enlargeY + 'px'
        }
      
        // 3. 执行move行为
        move () {
          this.show.addEventListener('mousemove', e => {
            e = e || window.event
            
            let x = e.pageX - this.ele.offsetLeft - 100
            let y = e.pageY - this.ele.offsetTop - 100
      
            const showX = this.show.clientWidth
            const showY = this.show.clientHeight
      
            const maskX = this.mask.clientWidth
            const maskY = this.mask.clientHeight
      
            const enlargeX = this.enlarge.clientWidth
            const enlargeY = this.enlarge.clientHeight
      
            // 边界值判断
            if (x <= 0) {
              x = 0
            }
      
            if (y <= 0) {
              y = 0
            }
      
            if (x + maskX >= showX) {
              x = showX - maskX
            }
      
            if (y + maskY >= showY) {
              y = showY - maskY
            }
      
            // 给遮罩层盒子赋值
            this.mask.style.left = x + 'px'
            this.mask.style.top = y + 'px'
      
            // 按照比例让右边的放大镜盒子跟着动
            // 背景图片移动距离 = 遮罩层移动距离 * 放大盒子尺寸 / 遮罩层尺寸
            const bgX = x * enlargeX / maskX
            const bgY = y * enlargeY / maskY
      
            this.enlarge.style.backgroundPosition = `-${bgX}px -${bgY}px`
            // this.enlarge.style.backgroundImage = 'url('//img01.hua.com/uploadpic/newpic/${data.data.ItemCode}.jpg_220x240.jpg')'
          })
        }
      
        // 4. 点击换个图片
        change () {
          const _this = this
          for (let i = 0; i < this.p.length; i++) {
            this.p[i].addEventListener('click', function () {
              for (let j = 0; j < _this.p.length; j++) {
                _this.p[j].className = ''
              }
      
              this.className = 'active'
      
              // this 是我点击的 p 标签
              // 你点击哪个 p 标签我就拿到了你应该展示的图片地址
              const showImg = this.children[0].getAttribute('showImg')
              _this.show.children[0].src = showImg
      
              const enlargeImg = this.children[0].getAttribute('enlargeImg')
              _this.enlarge.style.backgroundImage = 'url(' + enlargeImg + ')'
            })
          }
        }
      }
      
      function getStyle (ele, attr) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(ele)[attr]
        } else {
          return ele.currentStyle[attr]
        }
      }
      const box = document.querySelector('.box')
    const e = new Enlarge(box)
    console.log(e)
    }
// })
  }
// }
// 使用委托模式 添加加入购物车事件 
row.onclick = function(e) {
  var e = e || window.event;
  // 判定用户点击到的元素是谁
  var target = e.target;
  // 获取target的name属性 如果name属性值是 addCart 就说明点击的是加入购物车
  var name = target.name;
  if (name === "addCart") {
      // 登录验证 如果登陆过 就允许添加到购物车 但是不跳转页面
      var global = getCookie("global");
      if (global) {
          // 将当前的商品加入到本地存储中
          var cartList = JSON.parse(localStorage.getItem("cartList")) || [];
          console.log(cartList)
          // 判定本地存储中是否有商品信息 
          if (!cartList.length) {
              // 如果没有 直接往里存放
              productInfo.cart_number = 1;
              cartList.push(productInfo);
              localStorage.setItem("cartList", JSON.stringify(cartList));
          } else {
              // 如果有内容 我们要先判定这个购物车里面是否有当前产品
              var product = cartList.find(function(item) {
                  return item.goods_id === productInfo.goods_id
              });
              if (product) {
                  // 如果有 就数量+1
                  product.cart_number++;
              } else {
                  // 如果没有产品 就添加一条
                  productInfo.cart_number = 1;
                  cartList.push(productInfo);
              }
              
              // 将修改之后的数据重新放回本地存储
              localStorage.setItem("cartList", JSON.stringify(cartList));

          }
      } else {
          // 跳转回登录页面
          location.href = "./login.html?target=" + encodeURIComponent(location.href);
      }
  } 
  if (name === "buynow") {
    console.log(1);
      // 登录验证 如果登录过 就允许立即购买 跳转到购物车页面
      var global = getCookie("global");
      if (global) {
          // 将当前的商品加入到本地存储中
          var cartList = JSON.parse(localStorage.getItem("cartList")) || [];
          // 判定本地存储中是否有商品信息 
          if (!cartList.length) {
              // 如果没有 直接往里存放
              productInfo.cart_number = 1;
              cartList.push(productInfo);
              localStorage.setItem("cartList", JSON.stringify(cartList));
          } else {
              // 如果有内容 我们要先判定这个购物车里面是否有当前产品
              var product = cartList.find(function(item) {
                  return item.Id === productInfo.Id
              });
              if (product) {
                  // 如果有 就数量+1
                  product.cart_number++;
              } else {
                  // 如果没有产品 就添加一条
                  productInfo.cart_number = 1;
                  cartList.push(productInfo);
              }
              // 将修改之后的数据重新放回本地存储
              localStorage.setItem("cartList", JSON.stringify(cartList));
          }
          // 因为点击的是立即购买 所以要跳转到购物车
          location.href = "./cart.html";
          // console.log(1);
          
      } else {
          // 没有登陆过 
          console.log("没有登陆过 跳转到登录页面");
          // 跳转回登录页面
          location.href = "./login.html?target=" + encodeURIComponent(location.href);
      }
  }
}

new Car;

   






 
