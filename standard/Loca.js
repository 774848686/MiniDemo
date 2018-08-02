/**
 * commited by: 陆林冲
 */
//页面跳转-适用于浏览器环境
//文档参见：http://blog.csdn.net/huang100qi/article/details/49936383 -- 不一致，勿全信
var time = null;
var hrefReg = /^([^\/]+\/\/)([^\:\/\?\#]+)(\:?\d*)(\/?[^\?\#]*)(\??[^\#]*)(\#?.*)$/;
function go(href) {
    time = setTimeout(function () {
        window.location.href = href;
    }, 0);
}
function Loca(href) {
    this.href = href || location.href;
    this.$ms = null;
    this.$search = null;
}
Loca.prototype = {
    //获取 this.$search 值，根据 this.href
    $getSearch: function () {
        this.$ms = this.href.match(hrefReg);
        var qs = this.$ms[5].replace(/\?/, ''),
            arr = qs.split('&'),
            a, k, v;
        this.$search = {};
        //通过循环设置 this.$search 中的参数
        for (var i = 0; i < arr.length; i++) {
            a = arr[i].split('=');
            k = a[0];
            v = this.$search[k];
            if (v) {
                if (!(v instanceof Array)) {
                    this.$search[k] = [v];
                }
                this.$search[k].push(a[1]);
            } else {
                this.$search[k] = a[1];
            }
        }
    },
    //将this.$search转为 字符串
    $toQueryString: function () {
        var query = '?',
            value,
            search = this.$search,
            index = 0;
        for (var k in search) {
            value = search[k];
            if (value == null) {
                continue;
            } else if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    if (value[i] == null) continue;
                    if (index++ > 0) query += '&';
                    query += k + '=' + value[i];
                }
            } else {
                if (index++ > 0) query += '&';
                query += k + '=' + value;
            }
        }
        return query;
    },
    $fun: function (str, goFun, reFun) {
        clearTimeout(time);
        this.$ms = this.href.match(hrefReg);
        if (str) {
            goFun.call(this);
        } else {
            return reFun.call(this);
        }
        go(this.href);
        return this;
    },
    absUrl: function (absUrl) {
        clearTimeout(time);
        if (typeof absUrl == 'string') {
            this.href = absUrl;
            go(this.href);
            return this;
        } else {
            return this.href;
        }
    },
    url: function (url) {
        clearTimeout(time);
        var m = this.href.match(hrefReg);
        if (typeof url == 'string') {
            m[4] = url
            m.shift()
            this.href = m.join('');
            go(this.href);
            return this;
        } else {
            return m[4] + m[5] + m[6];
        }
    },
    path: function (path) {
        clearTimeout(time);
        var m = this.href.match(hrefReg);
        if (typeof path == 'string') {
            m[4] = path;
            m.shift();
            this.href = m.join('');
            go(this.href);
            return this;
        } else {
            return m[4];
        }
    },
    //协议
    protocol: function (protocol) {
        clearTimeout(time);
        var m = this.href.match(hrefReg);
        if (typeof protocol == 'string') {
            m[1] = protocol + '://';
            m.shift();
            this.href = m.join('');
            go(this.href);
            return this;
        } else {
            return m[1].replace('://', '');
        }
    },
    //ip
    host: function (host) {
        clearTimeout(time);
        var m = this.href.match(hrefReg);
        if (typeof host == 'string') {
            m[2] = host;
            m.shift();
            this.href = m.join('');
            go(this.href);
            return this;
        } else {
            return m[2];
        }
    },
    //端口
    port: function (port) {
        return this.$fun(port, function () {
            this.$ms[3] = ':' + port;
            this.$ms.shift();
            this.href = this.$ms.join('');
        }, function () {
            return this.$ms[3].replace(/\:/, '');
        })
    },
    hash: function (hash) {
        return this.$fun(hash, function () {
            this.$ms[6] = "#" + hash;
            this.$ms.shift();
            this.href = this.$ms.join('');
        }, function () {
            return this.$ms[6].replace(/\#/, '');
        })
    },
    search: function (first, second) {
        clearTimeout(time);
        this.$ms = this.href.match(hrefReg);
        //只传入一个参数并且是字符串，该字符串必须是完整的querystring
        if (arguments.length == 1 && typeof first == 'string') {
            this.$ms[5] = first;
        } else {
            this.$getSearch();
            if (arguments.length == 2) {
                //两个参数
                this.$search[first] = second;
                //判断第一个参数是否是对象
            } else if (typeof first == 'object') {
                //如果第一个参数为对象
                this.$search = first;
            } else {
                return this.$search;
            }
            this.$ms[5] = this.$toQueryString();
        }
        this.$ms.shift();
        this.href = this.$ms.join('');
        go(this.href);
        return this;
    },
    replace: function () {
        clearTimeout(time);
        location.replace(this.href);
    }
}
export default Loca;