let routes = [
    {
        path:'/',
        name:'layout',
        redirect:{name:'index'},
        component:'layout',
        children:[
            {
                component:'index/index'
            },
            {
                component:'shop/goods/list'
            }
        ]
    },
    {
        component:'login/index'
    },
    {
        path:'*',
        redirect:{name:'index'},
    }
]

/* 管理路由信息 */
let manageRoutes = function () {
    autoCreateRouter(routes)
    return routes
}

/* 自动生成路由 */
function autoCreateRouter(arr){
    for ( let i = 0; i < arr.length; i++){
        if(!arr[i].component) return
        /* 1、去除末尾index,生成name和path */
        let val = manageIndex(arr[i].component)
        arr[i].name = arr[i].name ||  val.replace(/\//g,'-')
        arr[i].path = arr[i].path || `/${val}`

        /*2、生成component */
        let createComp = import(`../../pages/${arr[i].component}.vue`)
        arr[i].component = () => createComp
        if(arr[i].children && arr[i].children.length > 0){
            autoCreateRouter(arr[i].children)
        }
    }
}

/* 处理index */
function manageIndex(str) {
    let idx = str.lastIndexOf('/')
    let val = str.substring(idx + 1)
    if(val === 'index'){
        return str.substring(idx, -1)
    }
    return str
}

export default manageRoutes()