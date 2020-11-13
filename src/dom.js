window.dom = {
    //create: function(){}
    //创建节点
    create(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();  //去除空格
        return container.content.firstChild;
    },
    //新增弟弟
    after(node, node2){
       node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //新增哥哥
    before(node, node2){
        node.parentNode.insertBefore(node2,node);
    },
    //新增儿子
    append(parent, node){
        parent.appendChild(node);
    },
    //新增爸爸
    wrap(node, parent){
        dom.before(node, parent);  //把新增爸爸放到儿子node前面
        dom.append(parent, node);  //把儿子node放到新增爸爸里面
    },

    //删除节点
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    //删除后代
    empty(node){
        //const childNodes = node.childNodes;
        //const {childNodes} = node;
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    //读写属性
    attr(node, name, value){  //重载
        if(arguments.length === 3){
            node.setAttribute(name, value);  //写
        }else if(arguments.length === 2){
            return node.getAttribute(name);  //读
        }
    },
    //读写文本内容
    text(node, string){  //适配
        if(arguments.length === 2){  //写
            if(`innerText` in node){
                node.innerText = string;  //ie
            }else{
                node.textContent = string;  //firefox/chrome
            }
        }else if(arguments.length === 1){  //读
            if(`innerText` in node){
                return node.innerText;
            }else{
                return node.textContent;
            }
        }
    },
    //读写HTML内容
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string;
        }else if(arguments.length === 1){
            return node.innerHTML;
        }
    },
    //读写style内容
    style(node, name, value){
        if(arguments.length === 3){
            //dom.style(div, 'color', 'red')
            node.style[name] = value;
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                //dom.style(div, 'color')
                return node.style[name];
            }else if(name instanceof Object){
                //dom.style(div, {color: 'red'})
                const object = name;
                for(let key in object){
                    node.style[key] = object[key];
                }
            }
        }
    },
    class: {
        add(node, className){  //添加class
            node.classList.add(className);
        }, 
        remove(node, className){  //删除class
            node.classList.remove(className);
        },
        has(node, className){  //判断className是否存在
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn){  //添加事件监听
        node.addEventListener(eventName, fn);
    }, 
    off(node, eventName, fn){  //删除事件监听
        node.removeEventListener(eventName, fn);
    },
    //获取标签或标签们
    find(selector, scope){
        return (scope || document).querySelectorAll(selector);
    },
    //获取父元素
    parent(node){
        return node.parentNode;
    },
    //获取子元素
    children(node){
        return node.children;
    },
    //获取兄弟姐妹元素
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node); //转化为数组并过滤掉自己
    },
    //获取下一个节点
    next(node){
        let x = node.nextSibling;
        while(x && x.nodeType === 3){
            x = x.nextSibling;
        }
        return x;
    },
    //获取上一个节点
    previous(node){
        let x = node.previousSibling;
        while(x && x.nodeType === 3){
            x = x.previousSibling;
        }
        return x;
    },
    //遍历所有节点
    each(nodeList, fn){
        for(let i=0; i<nodeList.length; i++){
            fn.call(null, nodeList[i]);
        }
    },
    //获取排行老几
    index(node){
        const list = dom.children(node.parentNode);
        let i;
        for(i=0; i<list.length; i++){
            if(list[i]===node){
                break;
            }
        }
        return i;
    }
};