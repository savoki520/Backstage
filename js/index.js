var $href = "http://www.youguangchina.cn/";
// var $href = 'http://192.168.0.101:8080/';
var ac = 0;//活动总数量；
// var E = window.wangEditor;
// var editor,notice,refund;
window.onload = function () {
    var key = localStorage.getItem('key');
    if(key === 'index'){
        readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0);
    }
    else if(key === 'merchant'){
        readmerchant(1,0);
    }
    else if(key === 'headinfor'){

    }
    else if(key === 'applicate'){
        var applica = $('.applicate_c_two');
        var width = applica.width();
        var number = parseInt(width/322);
        var status = $('.applicate_c_oneadd').attr('data-id');
        applica.children().remove();
        appread(status,1,number,0);
    }
    else if(key === 'acshow'){
        readhd();
    }
    else if(key === 'head'){
        headread(1,0);
    }
    else if(key === 'mcapplicate'){
        var mcapplica = $('.mcapplicate_c_two');
        var mcwidth = mcapplica.width();
        var mcnumber = parseInt(mcwidth/322);
        var mcstatus = $('.mcapplicate_c_oneadd').attr('data-id');
        mcapplica.children().remove();
        mcappread(mcstatus,1,mcnumber,0);
    }
    else if(key === 'cashflow'){
        cashread(1,'1',0);
    }
    else if(key === 'employee') {
        employ();
    }
};
var $body=$('body');
//主页-->导航栏一级菜单的切换
$('.nav_itema').click(function () {
    $(this).siblings('.nav_item_ul').toggle("");
});
//主页-->导航栏活动上下架切换--》上架列表
$('.content_two_shelf').click(function () {
    $(this).addClass('shelf_add');
    $('.content_two_obtained').removeClass('shelf_add');
    readactivity($('.index').attr('data-id'),'0',1,0);
    $('.content_two_nav').attr('data-page',0);//代表上下架的分类
});
//主页-->导航栏活动上下架切换--》下架列表
$('.content_two_obtained').click(function () {
    $(this).addClass('shelf_add');
    $('.content_two_shelf').removeClass('shelf_add');
    readactivity($('.index').attr('data-id'),'1',1,0);
    $('.content_two_nav').attr('data-page',1);//代表上下架的分类
});
//主页-->导航栏一级标题
$('.content_two_title').click(function () {
    var title = $('.content_two_title');
   title.removeClass('level_add');
   $(this).addClass('level_add');
   var index = title.index(this);
   $('.index').attr('data-id',index);//代表当前活动的分类
   if(index === 0){
       $('.content_two_shelf').addClass('shelf_add').children('#content_two_shelf').text('已上架');
       $('.content_two_obtained').removeClass('shelf_add').children('#content_two_obtained').text('已下架');
       readactivity('0','0',1,0);
       $('.content_two_nav').attr('data-page',0);//代表上下架的分类
   }
   else {
       $('.content_two_shelf').addClass('shelf_add').children('#content_two_shelf').text('进行中');
       $('.content_two_obtained').removeClass('shelf_add').children('#content_two_obtained').text('已结束');
       readactivity('1','0',1,0);
       $('.content_two_nav').attr('data-page',0);//代表上下架的分类
   }

});
//主页-->新建活动
$(".new").click(function () {
    $(".newbox").show().attr('data-id',null);
    $('.table_pagination').hide();
    $('.new').hide();
    $('.content_two').hide();
    $('#img_one').attr('src','img/index/n_1.png');
    $('#img_two').attr('src','img/index/n_1.png');
    $('.year').val(null);
    $('.months').val(null);
    $('.day').val(null);
    $('#oldamout').val(null);
    $('#newamout').val(null);
    $('#number').val(null);
    $('#activityname').val(null);
    $('#opentime').val(null);
    $('#notice').val(null);
    $('#coupontime').val(null);
    $('.customertel').val(null);
    $('#limitnumber').val(null);
    $('#img_o').attr('src','img/index/n_1.png');
    $('#img_t').attr('src','img/index/n_1.png');
    $('#img_tr').attr('src','img/index/n_1.png');
    $('#img_five').attr('src','img/index/n_1.png');
    $('#img_six').attr('src','img/index/n_1.png');
    $('#img_seven').attr('src','img/index/n_1.png');
    $('#img_eight').attr('src','img/index/n_1.png');
    $('#img_nine').attr('src','img/index/n_1.png');
    $('#img_f').attr('src','img/index/n_4.png');
    $('#commission').val(null);
    $('.new_one_kefu_canel').parent('.new_one_fourbox').remove();

    $('.new_one_four_address').eq(0).val(null);
    $('.new_two_four_amount').text(null);
    $('#shopname').removeClass('new_one_fournameadd').addClass('new_one_fourname').text(null);
    $('.new_ok').attr('data-status',0);
    $('.new_one_fourchange').hide();
});
//主页-->商家选择
$('#shopname').click(function () {
    $('.choose').css('opacity',0).show().animate({
        opacity:1
    });
    choose(1,0);
});
$('.new_one_fourchange').click(function () {
    $('.choose').css('opacity',0).show().animate({
        opacity:1
    });
    choose(1,0);
});
//主页-->新建活动-->商家选择
function  choose(n,k) {
    var data = {nowPage:n};
    $('.choose-item').remove();
    $.ajax({
        url:$href + 'MarketPlatform/seller/getSellers',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var ac = data.totalNum,st1,st2;
            var cs = 1.8,dh = 0.4,n = data.merchants.length,zh;
            zh = cs + dh*n+0.65;
            $('.choosebox').animate({
                height:zh + 'rem'
            });
            if(k === 0){//代表是列表初始化或者增加活动之后
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'choosepage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: ac //数据总数
                        ,limit:10
                        ,jump: function(obj,fa){
                            if(!fa){
                                choose(obj.curr,1);
                            }
                        }
                    });
                });
            }
            for(var i = 0;i<data.merchants.length;i++){
                if(data.merchants[i].isaccredit==='1'){
                    st1 = 'block';
                    st2 = 'none';
                }else {
                    st1 = 'none';
                    st2 = 'block';
                }
                $('.choose_header').after('<div class="choose-item" data-id="'+ data.merchants[i].shopId +'">\n' +
                    '                    <div class="choose_wx" style="display: '+st1+'">\n' +
                    '                        <img src="img/index/f_0.png">\n' +
                    '                    </div>\n'+
                    '                    <div class="choose_wx" style="display: '+st2+';">\n' +
                    '                        <img src="img/index/f_1.png">\n' +
                    '                    </div>\n'+
                    '                    <div class="choose_itemname">'+ data.merchants[i].shopName +'</div>\n' +
                    '                    <div class="choose_itemaddress">'+ data.merchants[i].remark1 +'</div>\n' +
                    '                    <div class="choose_itemcontact">'+ data.merchants[i].remark2 +'</div>\n' +
                    '                    <div class="choose_itemdo">\n' +
                    '                        <div class="choose_ok" onclick="chooseok($(\'.choose_ok\').index(this))">确定</div>\n' +
                    '                    </div>\n' +
                    '                </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//主页-->商家选择确定ok
function chooseok(i) {
    $('#shopname').removeClass('new_one_fourname').addClass('new_one_fournameadd').text($('.choose_itemname').eq(i)
        .text()).attr('data-id',$('.choose-item').eq(i).attr('data-id'));
    $('.choose').animate({
        opacity:0
    },function () {
        $('.choose').hide().css('opacity',1);
    });
    $('.new_one_fourchange').show();
}
//主页-->地址数组增加
var address = [];
function addressa() {
    for(var i = 0;i<$('.new_one_four_address').length;i++){
        address[i] = $('.new_one_four_address').eq(i).val();
    }
}
//主页--》客服电话增加
var ph = [];
function addphone(e,k) {
    for(var i = 0;i<$('.customertel').length;i++){
        ph[i] = $('.customertel').eq(i).val();
    }
    if(k === 1||k === '1'){
        var content = e.val().length;
        var number = parseInt(e.val()).toString().length;
        if(content !== number){
            alert('请输入数字');
            e.val(null);
        }
        else if(number!==11&&number!==7){
            alert('请输入正确的联系方式');
            e.val(null);
        }
    }
}

var E = window.wangEditor;
var F = window.wangEditor;
var G = window.wangEditor;
var editor,notice,refund;
//文字素材
editor = new E("#editor");
editor.customConfig.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough',
    'foreColor', 'backColor', 'justify',  'table', 'undo',  'redo','image','emoticon'];
editor.customConfig.uploadImgShowBase64 = true;
editor.create();

//产品介绍
notice = new F("#notice");
notice.customConfig.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough',
    'foreColor', 'backColor', 'justify','image','emoticon',  'table', 'undo',  'redo'];
notice.customConfig.uploadImgShowBase64 = true;
notice.create();

//退改说明
refund = new G("#refund");
refund.customConfig.menus = ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough',
    'foreColor', 'backColor', 'justify',  'table', 'undo',  'redo','image','emoticon'];
refund.customConfig.uploadImgShowBase64 = true;
refund.create();
//主页-->新建活动确定
$(".new_ok").click(function () {
    var time = $('#ymd').val(),notice1,refund1,no ,re;
    var oldamout = $("#oldamout").val(),newamout = $("#newamout").val(),number=$("#number").val(),
        acname=$('#activityname').val(),opentime=$("#opentime").val(),couptime=$('#coupontime').val(),
        commission=$('#commission').val(),liminum=$('#limitnumber').val(),actcoordinate = $('.tposition').val();
    no = notice.txt.html();
    re = refund.txt.html();
    var html = editor.txt.html();
    var formdata = new FormData();
    formdata.append('file1',$('.file_cover').get(0).files[0]);//活动封面
    formdata.append('file6',$('.file_covertwo').get(0).files[0]);//活动置顶图
    // console.log($('.file_cover').get(0).files[0]);
    formdata.append('overTime',time);//活动截止时间
    formdata.append('realprice',oldamout);//原价
    formdata.append('nowprice',newamout);//现价
    formdata.append('goodsNumber',number);//剩余数量
    formdata.append('activityName',acname);//活动名称
    formdata.append('businessHours',opentime);//营业时间
    formdata.append('cdkusedtime',couptime);//优惠券截止日期
    formdata.append('graphicdetail',html);//素材文字
    formdata.append('limitnum',liminum);//限购份数
    formdata.append('actcoordinate',actcoordinate);//活动地点坐标
    if(no === null||no === ''){
        notice1 = '<p>本券为电子券，购买凭电子核销码到店核销即可使用，数量有限售完为止</p>';
    }else {
        notice1 = no;
    }
    if(re === null||re === '<p><br></p>'){
        refund1 = '<p>本券不兑现，不找零，不与店内其他优惠同享，核销后无法退款，遗失不补，按实际支付金额开具发票</p>' +
            '<p>最终解释权归活动举办方所有</p>';
    }else {
        refund1  = re;
    }
    formdata.append('notice',notice1);//产品介绍
    formdata.append('instructions',refund1);//退改说明
    formdata.append('file2',$('#newfileone').get(0).files[0]);//活动详情图
    formdata.append('file3',$('#newfiletwo').get(0).files[0]);//活动详情图
    formdata.append('file4',$('#newfilethree').get(0).files[0]);//活动详情图
    formdata.append('file7',$('#newfilefour').get(0).files[0]);//活动详情图
    formdata.append('file8',$('#newfilefive').get(0).files[0]);//活动详情图
    formdata.append('file9',$('#newfilesix').get(0).files[0]);//活动详情图
    formdata.append('file10',$('#newfileseven').get(0).files[0]);//活动详情图
    formdata.append('file11',$('#newfileeight').get(0).files[0]);//活动详情图
    formdata.append('file5',$('#poster').get(0).files[0]);//海报
    formdata.append('commissionMoney',commission);//佣金
    formdata.append('activeContent','啊加上看到过');//活动简介
    formdata.append('shopId',$("#shopname").attr('data-id'));//商家id
    formdata.append('actcategory',$('.new_two_fiveselect').attr('data-id'));
    var status = $(this).attr('data-status');//确定的当前状态，分辨是修改功能还是添加功能
    if(time === null||time === ''||oldamout===null||oldamout===''||newamout===null||newamout===''||
        number===null||number===''||acname===null||acname===''||opentime===null||opentime===''||
        couptime===null||couptime===''||commission===null||commission===''||liminum===''||
        liminum===null||actcoordinate===null||actcoordinate===''){
        alert('请完善活动信息！')
    }else {
        if(status === '1'||status === 1){//修改功能
            console.log('修改')
            var dress = $('.new_one_four_address');
            formdata.append('activityId',$('.newbox').attr('data-id'));
            for(var i = 0;i<dress.length;i++){
                formdata.append('exchangeAddress',dress.eq(i).val());//商家地址
            }
            var te = $('.customertel');
            for(var j = 0;j<te.length;j++){
                formdata.append('tel',te.eq(j).val());//商家地址
            }
            $.ajax({
                url:$href + 'MarketPlatform/activity/compileActivity',
                method: "POST",
                data: formdata,
                contentType:false,
                processData: false,
                cache:false,
                async: false,
                success:function (data) {
                    console.log(data);
                    if(data.result === 'true'||data.result === true){
                        $(".newbox").hide();
                        $('.table_pagination').show();
                        $('.new').show();
                        $('.content_two').show();
                        $('.file_cover').val(null);
                        $('.file_covertwo').val(null);
                        $('#newfileone').val(null);
                        $('#newfiletwo').val(null);
                        $('#newfilethree').val(null);
                        $('#newfilefour').val(null);
                        $('#poster').val(null);
                        $('.tposition').val(null);
                        readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0);
                    }
                    else {
                        alert('活动信息修改失败！');
                    }
                },
                error:function () {
                    alert('请勿频繁操作');
                }
            });
        }
        else {//添加功能
            for(var i = 0;i<address.length;i++){
                formdata.append('exchangeAddress',address[i]);//商家地址
            }
            for(var j = 0;j<ph.length;j++){
                formdata.append('tel',ph[j]);//商家地址
            }
            $.ajax({
                url:$href + 'MarketPlatform/activity/createActivity',
                method: "POST",
                data: formdata,
                contentType:false,
                processData: false,
                cache:false,
                async: false,
                success:function (data) {
                    console.log(data);
                    if(data.result === 'true'||data.result === true){
                        alert('创建活动成功！');
                        $(".newbox").hide();
                        $('.table_pagination').show();
                        $('.new').show();
                        $('.content_two').show();
                        $('.file_cover').val(null);
                        $('.file_covertwo').val(null);
                        $('#newfileone').val(null);
                        $('#newfiletwo').val(null);
                        $('#newfilethree').val(null);
                        $('#newfilefour').val(null);
                        $('#newfilefive').val(null);
                        $('#newfilesix').val(null);
                        $('#newfileseven').val(null);
                        $('#newfileeight').val(null);
                        $('#poster').val(null);
                        $('.tposition').val(null);
                        readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0);
                    }
                    else {
                        alert('新建活动失败！');
                    }
                },
                error:function () {
                    alert('请勿频繁操作');
                }
            });
        }
    }
});
//主页--》新建活动取消
$('.new_cannel').click(function () {
    $(".newbox").hide();
    $('.table_pagination').show();
    $('.new').show();
    $('.content_two').show();
});


//活动列表读取
function readactivity(type,m,page,k) {//type代表活动类型，m代表活动状态0为平台上架列表或者商家进行中的活动
    $('.loading').show();
// 1为平台下架列表或者商家结束的活动 page 页码，k初始化
    var logo,sta;
    if(m === '0'&&type === '0'){//平台 上架活动
        logo = 0;
        sta = '';
    }
    else if(m === '1'&&type === '0'){//平台 下架活动
        logo = 1;
        sta = ''
    }
    else if(m === '0'&&type === '1') {//商家 进行中活动
        logo = '';
        sta = 1;
    }
    else {//商家 已结束活动
        logo = '';
        sta = 0;
    }
    var data = {createrLogo1:logo,createrLogo2:type,activitystatus:sta,shopId:'',nowPage:page,eachNumber:10,newstatus:'',hotstatus:'',banner:''};
    $(".content_twobox").children().not('.loading').remove();
    var status,st;
    console.log(data);
    if(type === '0'){//平台活动数据读取
        $.ajax({
            url:$href + 'MarketPlatform/activity/getActivities',
            type:'post',
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                console.log(data);
                ac = data.totalNum;
                if(k === 0){//代表是列表初始化或者增加活动之后分页更新
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'PageLimit' //注意，这里的 test1 是 ID，不用加 # 号
                            ,count: ac //数据总数
                            ,limit:10
                            ,jump: function(obj,fa){
                                if(!fa){
                                    readactivity(type,m,obj.curr);
                                }
                            }
                        });
                    });
                }
                if(m === '0'){//表示上架的活动
                    status = '下架';
                    st = 3;
                }
                else {
                    status = '上架';
                    st = 2;
                }
                if(data.activities.length === 0){
                    $('.content_twobox').append('<div class="content_twono">暂无数据</div>');
                    setTimeout('cartoon()',200);
                }
                for(var i = 0;i<data.activities.length;i++){
                    var zs = parseInt(data.activities[i].goodsNumber)+parseInt(data.activities[i].sellNumber);
                    var addre = data.activities[i].exchangeAddress.split("/");
                    $('.content_twobox').append('<div class="content_item" data-id="'+ data.activities[i].activityId +'" data-stuts=1>\n' +
                        '                    <div class="content_item_titlebox">\n' +
                        '                        <span class="content_item_title">商家名称：</span>\n' +
                        '                        <span class="content_item_name">' + data.activities[i].shopName + '</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="content_item_intro">\n' +
                        '                        <div class="content_item_imgbox">\n' +
                        '                            <img class="content_item_img" src="' + data.activities[i].QRCode1 + '">\n' +
                        '                            <div class="content_hot">热度：' + data.activities[i].joinnumber + '</div>\n' +
                        '                        </div>\n' +
                        '                        <div class="content_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                        '                        <div class="content_item_address">' + addre[0] + '</div>\n' +
                        '                        <div class="content_item_oldamout">原价：￥<span class="oldamout">'+ data.activities[i].realprice +'</span></div>\n'+
                        '                        <div class="content_item_amoutbox">\n' +
                        '                            <div class="content_item_newamout">平台价：￥<span class="newamout">' + data.activities[i].nowprice + '</span></div>\n' +
                        '                            <div class="content_item_shopnumber">购买：'+data.activities[i].sellNumber + '/'+ zs +'</div>\n'+
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                     <div class="content_item_do">\n'+
                        '                       <div class="content_item_obtained" onclick="palt($(\'.content_item_obtained\').index(this),'+ st +')">'+ status +'</div>\n' +
                        '                       <div class="content_item_endtime">截止时间：<span class="content_item_time">'+ data.activities[i].PTendTime +'</span></div>\n' +
                        '                     </div>\n'+
                        '                </div>');
                    if(i === data.activities.length-1){
                        setTimeout('cartoon()',1000);
                    }
                }
            },
            error:function () {
                alert('请勿频繁操作');
            }
        });
    }
    else {//商家活动数据读取
        $.ajax({
            url:$href + 'MarketPlatform/activity/getActivities',
            type:'post',
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                console.log(data);
                ac = data.totalNum;
                if(k === 0){//代表是列表初始化或者增加活动之后分页更新
                    layui.use('laypage', function(){
                        var laypage = layui.laypage;
                        //执行一个laypage实例
                        laypage.render({
                            elem: 'PageLimit' //注意，这里的 test1 是 ID，不用加 # 号
                            ,count: ac //数据总数
                            ,limit:10
                            ,jump: function(obj,fa){
                                if(!fa){
                                    readactivity(type,m,obj.curr);
                                }
                            }
                        });
                    });
                }
                if(m === '0'){//表示进行中的活动
                    status = '结束';
                    st = 1;
                }
                else {
                    status = '开始';
                    st = 2;
                }
                if(data.activities.length === 0){
                    $('.content_twobox').append('<div class="content_twono">暂无数据</div>');
                    setTimeout('cartoon()',200);
                }
                for(var i = 0;i<data.activities.length;i++){
                    var addre = data.activities[i].exchangeAddress.split("/");
                    var staa;
                    var zs = parseInt(data.activities[i].goodsNumber)+parseInt(data.activities[i].sellNumber);
                    if(data.activities[i].createrLogo3 === '0'){//已上架
                        staa = '上架中';
                    }
                    else if(data.activities[i].createrLogo3 === '1'){//已下架
                        staa = '已下架';
                    }
                    else {//待上架
                        staa = '待上架';
                    }
                    $('.content_twobox').append('<div class="content_item" data-id="'+ data.activities[i].activityId +'" data-stuts=1>\n' +
                        '                    <div class="content_item_titlebox">\n' +
                        '                        <span class="content_item_title">商家名称：</span>\n' +
                        '                        <span class="content_item_name">' + data.activities[i].shopName + '</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="content_item_intro">\n' +
                        '                        <div class="content_item_imgbox">\n' +
                        '                            <img class="content_item_img" src="' + data.activities[i].QRCode1 + '">\n' +
                        '                            <div class="content_hot">热度：' + data.activities[i].joinnumber + '</div>\n' +
                        '                            <div class="content_shop">购买：' + data.activities[i].sellNumber + '/'+zs+'</div>\n' +
                        '                            <div class="content_class">'+ staa +'</div>\n'+
                        '                        </div>\n' +
                        '                        <div class="content_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                        '                        <div class="content_item_address">' + addre[0] + '</div>\n' +
                        '                      <div class="content_item_oldamout">原价：￥<span class="oldamout">'+ data.activities[i].realprice +'</span></div>\n'+
                        '                        <div class="content_item_amoutbox">\n' +
                        '                            <div class="content_item_newamout">平台价：￥<span class="newamout">' + data.activities[i].nowprice + '</span></div>\n' +
                        '                            <div class="content_item_commission">佣金：<span>' + data.activities[i].commissionMoney + '</span></div>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                     <div class="content_item_do">\n'+
                        '                          <div class="content_item_obtained" onclick="obtain($(\'.content_item_obtained\').index(this),'+ st +')">'+ status +'</div>\n' +
                        '                          <div class="content_item_palt" onclick="palt($(\'.content_item_palt\').index(this),4)">平台上架</div>\n'+
                        '                          <div class="content_item_modify" onclick="modify($(\'.content_item_modify\').index(this))">修改</div>\n' +
                        '                     </div>\n'+
                        '                </div>');
                    if(i === data.activities.length-1){
                        setTimeout('cartoon()',1000);
                    }
                }
            },
            error:function () {
                alert('请勿频繁操作');
            }
        });
    }
}

//主页-->活动列表-->修改功能
function modify(i) {

    $('.new_one_four_canel').parent('.new_one_fourbox').remove();
    $('.new_one_kefu_canel').parent('.new_one_fourbox').remove();

    var id = $('.content_item').eq(i).attr('data-id');
    var data = {activityId:id};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/getActivity',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            $('.new_one_fourchange').show();
            $('.newbox').show().attr('data-id',id);
            $('.table_pagination').hide();
            $('.new').hide();
            $('.content_two').hide();
            $('#img_one').attr('src',data.QRCode1);//封面图
            $('#img_two').attr('src',data.QRCode6);//置顶图
            var time = data.overTime;
            $('#ymd').val(time);
            $('#limitnumber').val(data.limitnum);
            $('#oldamout').val(data.realprice);
            $('#newamout').val(data.nowprice);
            $('#number').val(data.goodsNumber);
            $('.w-e-text').eq(2).text(data.graphicdetail);//文字素材
            $('#activityname').val(data.activityName);
            $('#shopname').removeClass('new_one_fourname').addClass('new_one_fournameadd').text(data.shopName).attr('data-id',data.shopId);
            $('#opentime').val(data.businessHours);
            $('#coupontime').val(data.cdkusedtime);
            // $('#notice').val(data.notice);
            $('.w-e-text').eq(0).text(data.notice);
            $('#img_o').attr('src',data.QRCode2);
            $('#img_t').attr('src',data.QRCode3);
            $('#img_tr').attr('src',data.QRCode4);
            $('#img_f').attr('src',data.QRCode5);
            $('#img_six').attr('src',data.QRCode8);
            $('#img_seven').attr('src',data.QRCode9);
            $('#img_eight').attr('src',data.QRCode10);
            $('#img_nine').attr('src',data.QRCode11);
            $('#img_five').attr('src',data.QRCode7);
            $('#commission').val(data.commissionMoney);
            var zj = parseFloat(data.nowprice)+parseFloat(data.commissionMoney);
            $('.new_two_four_amount').text(zj.toFixed(2));
            var address = data.exchangeAddress.split('/');
            $('.new_one_four_address').eq(0).val(address[0]);
            $('.tposition').val(data.actcoordinate);
            $('.new_two_fiveitem').removeClass('new_two_fiveselect').eq(data.actcategory).addClass('new_two_fiveselect');
            for(var i = 1;i<address.length-1;i++){
                $('#first_fourbox').after(' <div class="new_one_fourbox">\n' +
                    '                        <div class="new_one_fourfont">活动地址</div>\n' +
                    '                        <input class="new_one_four_address" onchange="addressa()" ' +
                    '                           value="'+ address[i] +'">\n' +
                    '                       <div class="new_one_four_canel" onclick="deleteaddress($(\'.new_one_four_canel\').index(this))"></div>\n'+
                    '                    </div>')
            }
            var p = data.tel.split('/');
            $('.customertel').eq(0).val(p[0]);
            for(var j = 1;j<p.length-1;j++){
                $('.new_kefu').after('<div class="new_one_fourbox">\n' +
                    '                        <div class="new_one_fourfont">客服电话</div>\n' +
                    '                        <input class="customertel" onchange="addphone($(this),1)" value="'+p[j]+'">\n' +
                    '                       <div class="new_one_kefu_canel" onclick="deletphone($(\'.new_one_kefu_canel\').index(this))"></div>\n'+
                    '                    </div>')
            }
            $('.new_ok').attr('data-status',1);
            // $('#refund').val(data.instructions);
            $('.w-e-text').eq(1).text(data.instructions);
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//主页-->活动列表-->活动开始结束，活动下架
function obtain(n,k) {//n代表坐标，k代表开始或者结束或者下架活动
    $('.r_ok').css('opacity',0).show().attr('data-id',$('.content_item').eq(n).attr('data-id')).animate({
        opacity:1
    });
    if(k === 1){//代表进行中活动
        $('.ok_name').text('结束活动')
    }
    else if(k === 2){//代表已结束的活动
        $('.ok_name').text('开始活动')
    }
    else {//代表平台下架活动
        $('.ok_name').text('下架')
    }
}
//主页-->开始活动确定操作,下架活动确定操作
$('.ok').click(function () {
    $('.r_ok').animate({
        opacity:0
    },function () {
        $('.r_ok').hide();
    });
    var stu = $('.ok_name').text();
    var data,nowsta,tobesta;
    if(stu === '结束活动'||stu === '开始活动'){
        if(stu === '结束活动'){
            nowsta = 1;tobesta = 0;
        }
        else {
            nowsta = 0;tobesta = 1
        }
        data = {activityId:$('.r_ok').attr('data-id'),nowstatus:nowsta,tobestatus:tobesta};
        console.log(data);
        $.ajax({
            url:$href + 'MarketPlatform/activity/shelveActivity',
            type:'post',
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                console.log(data);
                if(data.resultMessage === '活动已到期结束，禁止重新启动！'){
                    alert('活动已到期结束，禁止开始活动！');
                }
                readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0)
            },
            error:function () {
                alert('请勿频繁操作');
            }
        });
    }
    else {//平台活动下架功能
        data = {activityId:$('.r_ok').attr('data-id'),createrLogo1:'1',createrLogo2:'0',PTday:0};
        $.ajax({
            url:$href + 'MarketPlatform/activity/SXJActivity',
            type:'post',
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                console.log(data);
                if(data.result === 'success'){
                    readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0)
                }
            },
            error:function () {
                alert('请勿频繁操作');
            }
        });
    }
});
//主页-->开始活动取消操作
$('.cancel').click(function () {
    $('.r_ok').animate({
        opacity:0
    },function () {
        $('.r_ok').hide();
    });
});
//主页-->添加新活动-->添加商家地址
$(".new_one_four_add").click(function () {
    $('#first_fourbox').after(' <div class="new_one_fourbox">\n' +
        '                        <div class="new_one_fourfont">活动地址</div>\n' +
        '                        <input class="new_one_four_address" onchange="addressa()">\n' +
        '                       <div class="new_one_four_canel" onclick="deleteaddress($(\'.new_one_four_canel\').index(this))"></div>\n' +
        '                    </div>');
});
//主页-->添加新活动-->删除商家地址
function deleteaddress(i) {
    $('.new_one_four_canel').eq(i).parent().remove();
    address = [];
    addressa();
}
//主页--》添加新客服电话--》添加功能
$(".new_one_fouradd").click(function () {
    $('.new_kefu').after('<div class="new_one_fourbox">\n' +
        '                        <div class="new_one_fourfont">客服电话</div>\n' +
        '                        <input class="customertel" onchange="addphone($(this),1)">\n' +
        '                       <div class="new_one_kefu_canel" onclick="deletphone($(\'.new_one_kefu_canel\').index(this))"></div>\n'+
        '                    </div>')
});
//主页--》添加新客服电话--》删除客服电话
function deletphone(e) {
    $('.new_one_kefu_canel').eq(e).parent().remove();
    ph = [];
    addphone(e,0)
}
//主页--》总价显示
function four() {
    var one = parseFloat($('#newamout').val());
    var two = parseFloat($('#commission').val());
    var amount = one + two;
    $('.new_two_four_amount').text(amount.toFixed(2));
}

//主页-->活动搜索
$('#index_select').click(function () {
    readselect($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0)
});

//主页-->获取活动搜索列表
function readselect(type,m,page,k) {//type 代表活动分类，m代表活动状态，page 页码，k页码初始化
    $('.loading').show();
    $(".content_twobox").children().not('.loading').remove();
    var logo,sta;
    if(m === '0'&&type === '0'){//平台 上架活动
        logo = 0;
        sta = '';
    }
    else if(m === '1'&&type === '0'){//平台 下架活动
        logo = 1;
        sta = ''
    }
    else if(m === '0'&&type === '1') {//商家 进行中活动
        logo = '';
        sta = 1;
    }
    else {//商家 已结束活动
        logo = '';
        sta = 0;
    }

    var data = {createrLogo1:logo,createrLogo2:type,activitystatus:sta,shopId:'',nowPage:page,
        activityName:$('#acname').val(),shopName:$('#spname').val(), timepoint:$('#actime').val(),eachNumber:10,newstatus:'',hotstatus:'',banner:''};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/searchActivities',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(k === 0){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'PageLimit' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: data.searchtotalNum //数据总数
                        ,limit:10
                        ,jump: function(obj,fa){
                            if(!fa){
                                readselect(type,m,obj.curr);
                            }
                        }
                    });
                });
            }
            if(type === '0'){//平台活动
                if(m === '0'){//表示上架的活动
                    status = '下架';
                    st = 3;
                }
                else {
                    status = '上架';
                    st = 2;
                }
                if(data.activities.length === 0){
                    $('.content_twobox').append('<div class="content_twono">暂无数据</div>');
                    setTimeout('cartoon()',500);
                }
                for(var i = 0;i<data.activities.length;i++){
                    var zs = parseInt(data.activities[i].goodsNumber)+parseInt(data.activities[i].sellNumber);
                    var addre = data.activities[i].exchangeAddress.split("/");
                    $('.content_twobox').append('<div class="content_item" data-id="'+ data.activities[i].activityId +'" data-stuts=1>\n' +
                        '                    <div class="content_item_titlebox">\n' +
                        '                        <span class="content_item_title">商家名称：</span>\n' +
                        '                        <span class="content_item_name">' + data.activities[i].shopName + '</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="content_item_intro">\n' +
                        '                        <div class="content_item_imgbox">\n' +
                        '                            <img class="content_item_img" src="' + data.activities[i].QRCode1 + '">\n' +
                        '                            <div class="content_hot">热度：' + data.activities[i].joinnumber + '</div>\n' +
                        '                            <div class="content_shop">购买：' + data.activities[i].sellNumber + '/'+zs+'</div>\n' +
                        '                        </div>\n' +
                        '                        <div class="content_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                        '                        <div class="content_item_address">' + addre[0] + '</div>\n' +
                        '                        <div class="content_item_oldamout">原价：￥<span class="oldamout">'+ data.activities[i].realprice +'</span></div>\n'+
                        '                        <div class="content_item_amoutbox">\n' +
                        '                            <div class="content_item_newamout">平台价：￥<span class="newamout">' + data.activities[i].nowprice + '</span></div>\n' +
                        '                            <div class="content_item_shopnumber">购买：'+data.activities[i].sellNumber + '/'+ zs +'</div>\n'+
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                     <div class="content_item_do">\n'+
                        '                       <div class="content_item_obtained" onclick="palt($(\'.content_item_obtained\').index(this),'+ st +')">'+ status +'</div>\n' +
                        '                       <div class="content_item_endtime">截止时间：<span class="content_item_time">'+ data.activities[i].PTendTime +'</span></div>\n' +
                        '                     </div>\n'+
                        '                </div>')
                    if(i === data.activities.length-1){
                        setTimeout('cartoon()',2000);
                    }
                }
            }
            else {//商家活动
                if(m === '0'){//表示进行中的活动
                    status = '结束';
                    st = 1;
                }
                else {
                    status = '开始';
                    st = 2;
                }
                if(data.activities.length === 0){
                    $('.content_twobox').append('<div class="content_twono">暂无数据</div>');
                    setTimeout('cartoon()',500);
                }
                for(var i = 0;i<data.activities.length;i++){
                    var addre = data.activities[i].exchangeAddress.split("/");
                    var staa;
                    var zs = parseInt(data.activities[i].goodsNumber)+parseInt(data.activities[i].sellNumber);
                    if(data.activities[i].createrLogo3 === '0'){//已上架
                        staa = '上架中';
                    }
                    else if(data.activities[i].createrLogo3 === '1'){//已下架
                        staa = '已下架';
                    }
                    else {//待上架
                        staa = '待上架';
                    }
                    $('.content_twobox').append('<div class="content_item" data-id="'+ data.activities[i].activityId +'" data-stuts=1>\n' +
                        '                    <div class="content_item_titlebox">\n' +
                        '                        <span class="content_item_title">商家名称：</span>\n' +
                        '                        <span class="content_item_name">' + data.activities[i].shopName + '</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="content_item_intro">\n' +
                        '                        <div class="content_item_imgbox">\n' +
                        '                            <img class="content_item_img" src="' + data.activities[i].QRCode1 + '">\n' +
                        '                            <div class="content_hot">热度：' + data.activities[i].joinnumber + '</div>\n' +
                        '                            <div class="content_shop">购买：' + data.activities[i].sellNumber + '/'+zs+'</div>\n' +
                        '                            <div class="content_class">'+ staa +'</div>\n'+
                        '                          <div class="content_commission">佣金：'+ data.activities[i].commissionMoney +'</div>\n'+
                        '                        </div>\n' +
                        '                        <div class="content_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                        '                        <div class="content_item_address">' + addre[0] + '</div>\n' +
                        '                      <div class="content_item_oldamout">原价：￥<span class="oldamout">'+ data.activities[i].realprice +'</span></div>\n'+
                        '                        <div class="content_item_amoutbox">\n' +
                        '                            <div class="content_item_newamout">平台价：￥<span class="newamout">' + data.activities[i].nowprice + '</span></div>\n' +
                        '                            <div class="content_item_commission">佣金：<span>' + data.activities[i].commissionMoney + '</span></div>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                     <div class="content_item_do">\n'+
                        '                          <div class="content_item_obtained" onclick="obtain($(\'.content_item_obtained\').index(this),'+ st +')">'+ status +'</div>\n' +
                        '                          <div class="content_item_palt" onclick="palt($(\'.content_item_palt\').index(this),4)">平台上架</div>\n'+
                        '                          <div class="content_item_modify" onclick="modify($(\'.content_item_modify\').index(this))">修改</div>\n' +
                        '                     </div>\n'+
                        '                </div>')
                    if(i === data.activities.length-1){
                        setTimeout('cartoon()',2000);
                    }
                }
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}

//主页--》新建或修改活动时数字限制
function numberli(e) {
    var content = e.val().length;
    var number = parseInt(e.val()).toString().length;
    if(content !== number){
        alert('请输入数字');
        e.val(null);
    }
}
function numb(obj){
    obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3'); //只能输入两个小数
}
$("option").click(function(){
    $("#select").removeAttr("size").blur();
});
$("#select").focus(function(){
    $("#select").attr("size","5");
});
//主页-->平台上架
function palt(i,m) {
    if(m === 3){//表示下架
        obtain(i,m)
    }
    else{//表示上架
        if(m === 2){//代表平台活动再次上架
            $('.she_ok').attr('data-id',0).attr('data-page',$('.content_item').eq(i).attr('data-id'));
            $('.shelves').css('opacity',0).show().animate({
                opacity:1
            });
        }
        else {//代表商家活动上架
            var status = $('.content_two_nav').attr('data-page');
            if(status === '0'){
                $('.she_ok').attr('data-id',1).attr('data-page',$('.content_item').eq(i).attr('data-id'));
                $('.shelves').css('opacity',0).show().animate({
                    opacity:1
                });
            }
            else {
                alert('活动已结束，禁止上架！');
            }
        }

    }
}
//主页--》平台上架确定
$('.she_ok').click(function () {
    var a = $('.she_ok').attr('data-id');
    var da = $('#select').val();
    var t = day(da);
    var data = {activityId:$('.she_ok').attr('data-page'),createrLogo1:'0',createrLogo2:a,PTday:t};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/SXJActivity',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(data.result === 'success'){
                $('.shelves').animate({
                    opacity:0
                },function () {
                    $('.shelves').hide();
                });
                readactivity($('.index').attr('data-id'),$('.content_two_nav').attr('data-page'),1,0)
            }
            else if(data.message === '活动已上架，禁止重复上架！'){
                alert(data.message)
            }
            else if(data.message === '活动已结束，禁止平台上架！'){
                alert(data.message)
            }
            else {
                alert('数据出错，请重新上架！')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
});
//主页--》平台上架取消
$('.she_cancel').click(function () {
    $('.shelves').animate({
        opacity:0
    },function () {
        $('.shelves').hide();
    });
});
//主页--》上架天数计算
function day(e) {
    var time;
    if(e === '2月'){
        time = 60;
        return time;
    }
    else if(e === '3月'){
        time = 90;
        return time;
    }
    else if(e === '4月'){
        time = 120;
        return time;
    }
    else if(e === '5月'){
        time = 150;
        return time;
    }
    else if(e === '6月'){
        time = 180;
        return time;
    }
    else if(e === '1年'){
        time = 365;
        return time;
    }
    else if(e === '7天'){
        time = 7;
        return time;
    }
    else if(e === '15天'){
        time = 15;
        return time;
    }
    else if(e === '30天'){
        time = 30;
        return time;
    }
    else if(e === '永久'){
        time = 0;
        return time ;
    }
}
//主页--》增加分类
$('.new_two_fiveadd').click(function () {
    $('.modify').show();
});
//主页--》增加分类--》取消
$('.modify_cannel').click(function () {
    $('.modify').hide()
});
//主页--》选中分类
$('.new_two_fiveitem').click(function () {
    $('.new_two_fiveitem').removeClass('new_two_fiveselect');
    $(this).addClass('new_two_fiveselect');
});




//商户页-->新建商家
$('.new_shop').click(function () {
    $('#shopName').val(null);
    $('#shopAddress').val(null);
    $('#shopprople').val(null);
    $('#shopphoneone').val(null);
    $('#shopphonetwo').val(null);
    $('#shopyear').val(null);
    $('#shopmonth').val(null);
    $('#shopday').val(null);
    $('#opentime').val(null);
    $('#merchant_fee').val(null);
    $('#shoptime').val(null);
    $('.new_merchant').css('opacity',0).show().animate({
        opacity:1
    });
});
//商户页-->新建商家ok
$('.merchant_ok').click(function () {
    var name = $('#shopName').val();//商家名称
    var addres = $('#shopAddress').val();//商家地址
    var prople = $('#shopprople').val();//商家负责人
    var po = $('#shopphoneone').val();//联系方式1
    var pt = $('#shopphonetwo').val();//联系方式2
    var opentime = $('#opentime').val();//营业时间
    var settime = $('#shoptime').val();//入驻时间
    var fee = $('#merchant_fee').val();//手续费
    var data ;
    if(name === null||name === ''||addres === null||addres===''||prople===null||prople===''||po===null||po===''
        ||opentime===null||opentime===''||settime===null||settime===''){
        alert('请完善商户信息！');
    }
    else {
        if($('.merchant').attr('data-page') === '1'){//代表新增
            data = {shopName:name,shopAddress:addres,workHours:opentime,leaderName:prople,tel1:po,
                tel2:pt,setTime:settime,poundagerates:fee};
            console.log(data);
            $.ajax({
                url:$href + 'MarketPlatform/seller/createSeller',
                type:'post',
                data:JSON.stringify(data),
                dataType:'json',
                contentType:'application/json',
                success:function (data) {
                    console.log(data);
                    if(data.result === 'success'){
                        $('.new_merchant').animate({
                            opacity:0
                        },function () {
                            $('.new_merchant').hide();
                        });
                        readmerchant(1,0);
                    }
                    else {
                        alert(data.message);
                    }
                },
                error:function () {
                    alert('请勿频繁操作');
                }
            });
        }
        else {//代表修改
            data = {shopName:name,shopAddress:addres,workHours:opentime,leaderName:prople,tel1:po,
                tel2:pt,setTime:settime,shopId:$('.merchant').attr('data-id'),poundagerates:fee};
            console.log(data);
            $.ajax({
                url:$href + 'MarketPlatform/seller/compileSellers',
                type:'post',
                data:JSON.stringify(data),
                dataType:'json',
                contentType:'application/json',
                success:function (data) {
                    console.log(data);
                    if(data.result === 'success'){
                        $('.new_merchant').animate({
                            opacity:0
                        },function () {
                            $('.new_merchant').hide();
                        });
                        readmerchant(1,0);
                    }
                    else {
                        alert('修改商家信息失败！')
                    }
                },
                error:function () {
                    alert('请勿频繁操作');
                }
            });
        }
    }
});
//商户页-->新建商家取消（退出）
$('.merchant_remove').click(function () {
    $('.new_merchant').animate({
        opacity:0
    },function () {
       $('.new_merchant').hide();
    });
});
//商家列表读取
function readmerchant(n,k) {
    $('.loading').show();
    $('.activity').children().not('.loading').remove();
    var data = {nowPage:n};
    $.ajax({
        url:$href + 'MarketPlatform/seller/getSellers',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            ac = data.totalNum;
            var st1,st2;
            if(k === 0){//代表是列表初始化或者增加活动之后分页的彼岸花
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'Limit' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: ac //数据总数
                        ,limit:10
                        ,jump: function(obj,fa){
                            if(!fa){
                                readmerchant(obj.curr);
                            }
                        }
                    });
                });
            }
            if(data.merchants.length === 0){
                $('.activity').append('<div class="content_twono">暂无数据</div>')
                setTimeout('cartoon()',500);
            }
            for(var i = 0;i<data.merchants.length;i++){
                var d1,d2;
                if(data.merchants[i].isaccredit==='1'){
                    st1 = 'table';
                    st2 = 'none'
                }else {
                    st1 = 'none';
                    st2 = 'table';
                }
                if(i === data.merchants.length-1){
                    setTimeout('cartoon()',1000);
                }
                if(data.merchants[i].shopcoordinate){//存在值，则已完成定位
                    d1 = 'block';d2 = 'none';
                }else {
                    d1 = 'none';d2 = 'block';
                }
                $('.activity').append('<div class="activity_item" data-id="'+ data.merchants[i].shopId +'" data-time="'+ data.merchants[i].remark6 +'">\n' +
                    '            <div class="ac_item_one">\n' +
                    '                <div class="font_one">\n' +
                    '                    <span >商户名称：</span>\n' +
                    '                    <span class="activityname" title="'+ data.merchants[i].shopName +'">'+data.merchants[i].shopName+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_one">\n' +
                    '                    <span>商户地址：</span>\n' +
                    '                    <span class="activityaddress" title="'+data.merchants[i].remark1+'">'+data.merchants[i].remark1+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>负责人：</span>\n' +
                    '                    <span class="activityprincipal" title="'+data.merchants[i].remark2+'">'+data.merchants[i].remark2+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>联系方式：</span>\n' +
                    '                    <span class="activityphone" title="'+data.merchants[i].remark3+'">'+data.merchants[i].remark3+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>手续费：</span>\n' +
                    '                    <span class="activityotherp" title="'+data.merchants[i].remark4+'">'+data.merchants[i].poundagerates+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>入驻时间：</span>\n' +
                    '                    <span class="activitytime" title="'+data.merchants[i].remark5+'">'+data.merchants[i].remark5+'</span>\n' +
                    '                </div>\n' +
                    '               <div class="font_three" style=\'display:'+st1+'\'>\n' +
                    '                        <div style=\'background-image: url("img/index/f_0.png")\'></div>\n' +
                    '                        <span style="float: left;">已授权</span>\n' +
                    '               </div>\n'+
                    '               <div class="font_three" style="display: '+st2+';">\n' +
                    '                        <div style=\'background-image: url("img/index/f_1.png")\'></div>\n' +
                    '                        <span style="float: left;color: red;">未授权</span>\n' +
                    '               </div>\n'+
                    '            </div>\n' +
                    '               <div class="ac_item_bottem">\n' +
                    '                 <div class="ac_item_bb">\n' +
                    '                        <div class="ac_item_two" onclick="compilation(\''+data.merchants[i].shopId+'\')">编辑</div>\n' +
                    '                        <div class="ac_item_three" onclick="view($(\'.ac_item_three\').index(this))">查看活动</div>\n' +
                    '                    </div>\n' +
                    '                    <div class="ac_item_bb">\n' +
                    '                        <div class="ac_item_four" onclick="reduction('+data.merchants[i].remark3+')">还原密码</div>\n' +
                    '                        <div class="ac_item_five" style="display: '+d2+';color:red;" onclick="po(\''+data.merchants[i].shopId+'\',' +
                    '\''+data.merchants[i].remark1+'\',\'1\')">定位</div>\n' +
                    '                        <div class="ac_item_five" style="display: '+d1+'" onclick="po(\''+data.merchants[i].shopId+'\','  +
                    '                    \''+data.merchants[i].remark1+'\',\'1\')">已定位</div>\n' +
                    '                    </div>\n'+
                    '                </div>\n'+
                    '        </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//商户页-->图片的上传和显示
function imgchange() {
    var reads= new FileReader();
    f=$('.file_cover').get(0).files[0];
    reads.readAsDataURL(f);
    reads.onload =function (e) {
        document.getElementById('img_one').src=this.result;
    };
}
function imgchangetwo() {
    var reads= new FileReader();
    f=$('.file_covertwo').get(0).files[0];
    reads.readAsDataURL(f);
    reads.onload =function (e) {
        document.getElementById('img_two').src=this.result;
    };
}
function imgfile(i) {
    var reads= new FileReader();
    f=$('.newfile').eq(i).get(0).files[0];
    reads.readAsDataURL(f);
    reads.onload =function (e) {
        $('.img_two').eq(i).attr('src',this.result)
    };
}
//商户页--》输入框联系人数字限制
function numberlimit(e) {
    var content = e.val().length;
    var number = parseInt(e.val()).toString().length;
    if(content !== number){
        alert('请输入数字');
        e.val(null);
    }
    else if(number!==11&&number!==7){
        alert('请输入正确的联系方式');
        e.val(null);
    }
}
//商户页-->商户修改（编辑功能）
function compilation(id) {
    $('.new_merchant').css('opacity',0).show().animate({
        opacity:1
    });
    var data = {shopId:id};
    $.ajax({
        url:$href + 'MarketPlatform/seller/getSeller',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            $('.merchant').attr('data-page',0).attr('data-id',id);
            $('#shopName').val(data.shopName);
            $('#shopAddress').val(data.shopAddress);
            $('#shopprople').val(data.leaderName);
            $('#shopphoneone').val(data.tel1);
            $('#shopphonetwo').val(data.tel2);
            $('#shoptime').val(data.setTime);
            $('#opentime').val(data.workHours);
            $('#merchant_fee').val(data.poundagerates);
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });

}
//商户页--》商户查询（搜索）
$('#merchant_select').click(function () {
    merselect(1,0);
});
function merselect(page,k) {
    var data = {shopName:$('#spname').val(),setTime:$('#actime').val(),nowPage:page,leaderName:$('#prople').val()};
    console.log(data);
    $('.loading').show();
    $('.activity').children().not('.loading').remove();
    $.ajax({
        url:$href + 'MarketPlatform/seller/searchSellers',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            ac = data.searchSellerstotalNum;
            if(k === 0){//代表是列表初始化或者增加活动之后分页的彼岸花
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'Limit' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: ac //数据总数
                        ,limit:10
                        ,jump: function(obj,fa){
                            if(!fa){
                                readmerchant(obj.curr,number);
                            }
                        }
                    });
                });
            }
            if(data.merchants.length === 0){
                $('.activity').append('<div class="content_twono">暂无数据</div>');
                setTimeout('cartoon()',500);
            }
            for(var i = 0;i<data.merchants.length;i++){
                var d1,d2;
                if(data.merchants[i].isaccredit==='1'){
                    st1 = 'table';
                    st2 = 'none'
                }else {
                    st1 = 'none';
                    st2 = 'table';
                }
                if(i === data.merchants.length-1){
                    setTimeout('cartoon()',1000);
                }
                if(data.merchants[i].shopcoordinate){//存在值，则已完成定位
                    d1 = 'block';d2 = 'none';
                }else {
                    d1 = 'none';d2 = 'block';
                }
                $('.activity').append('<div class="activity_item" data-id="'+ data.merchants[i].shopId +'" data-time="'+ data.merchants[i].remark6 +'">\n' +
                    '            <div class="ac_item_one">\n' +
                    '                <div class="font_one">\n' +
                    '                    <span >商户名称：</span>\n' +
                    '                    <span class="activityname" title="'+ data.merchants[i].shopName +'">'+data.merchants[i].shopName+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_one">\n' +
                    '                    <span>商户地址：</span>\n' +
                    '                    <span class="activityaddress" title="'+data.merchants[i].remark1+'">'+data.merchants[i].remark1+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>负责人：</span>\n' +
                    '                    <span class="activityprincipal" title="'+data.merchants[i].remark2+'">'+data.merchants[i].remark2+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>联系方式：</span>\n' +
                    '                    <span class="activityphone" title="'+data.merchants[i].remark3+'">'+data.merchants[i].remark3+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>手续费：</span>\n' +
                    '                    <span class="activityotherp" title="'+data.merchants[i].remark4+'">'+data.merchants[i].poundagerates+'</span>\n' +
                    '                </div>\n' +
                    '                <div class="font_two">\n' +
                    '                    <span>入驻时间：</span>\n' +
                    '                    <span class="activitytime" title="'+data.merchants[i].remark5+'">'+data.merchants[i].remark5+'</span>\n' +
                    '                </div>\n' +
                    '               <div class="font_three" style=\'display:'+st1+'\'>\n' +
                    '                        <div style=\'background-image: url("img/index/f_0.png")\'></div>\n' +
                    '                        <span style="float: left;">已授权</span>\n' +
                    '               </div>\n'+
                    '               <div class="font_three" style="display: '+st2+';">\n' +
                    '                        <div style=\'background-image: url("img/index/f_1.png")\'></div>\n' +
                    '                        <span style="float: left;color: red;">未授权</span>\n' +
                    '               </div>\n'+
                    '            </div>\n' +
                    '               <div class="ac_item_bottem">\n' +
                    '                 <div class="ac_item_bb">\n' +
                    '                        <div class="ac_item_two" onclick="compilation(\''+data.merchants[i].shopId+'\')">编辑</div>\n' +
                    '                        <div class="ac_item_three" onclick="view($(\'.ac_item_three\').index(this))">查看活动</div>\n' +
                    '                    </div>\n' +
                    '                    <div class="ac_item_bb">\n' +
                    '                        <div class="ac_item_four" onclick="reduction('+data.merchants[i].remark3+')">还原密码</div>\n' +
                    '                        <div class="ac_item_five" style="display: '+d2+';color:red;" onclick="po(\''+data.merchants[i].shopId+'\',' +
                    '\''+data.merchants[i].remark1+'\',\'1\')">定位</div>\n' +
                    '                        <div class="ac_item_five" style="display: '+d1+'" onclick="po(\''+data.merchants[i].shopId+'\','  +
                    '                    \''+data.merchants[i].remark1+'\',\'1\')">已定位</div>\n' +
                    '                    </div>\n'+
                    '                </div>\n'+
                    '        </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//商户页--》查看商户活动
function view(i) {
    var id = $('.activity_item').eq(i).attr('data-id');
    $('.new_boxtwo').css('opacity',0).show().attr('data-id',id).animate({
        opacity:1
    });
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/280);
    viewac(id,1,number,1,'','','0');
}
//商户页--》商户活动列表读取
function viewac(spid,page,number,k,aname,time,type) {//spid 商户id,page 页码，number 页面显示的活动数量，k 重置页码的标准
    var view = $('.hd_ic_two'),a,b;
    view.children().remove();
    var data = {shopId:spid,nowPage:page,eachNumber:2*number,activityName:aname,timepoint:time,createrLogo2:type};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/shopManagement',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var cs = 2,dh = 2.6,n = Math.round(data.activitylist.length/4),zh,s1,s2;
            zh = cs + dh*n;
            $('.hd_increase').animate({
                // height:zh + 'rem'
                height: 'auto'
            });
            var cla,sta;//cla代表活动类别，sta代表活动状态
            if(k === 1){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'hd_page' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: data.shopActTotalNum //数据总数
                        ,limit:2*number
                        ,jump: function(obj,fa){
                            if(!fa){
                                viewac(spid,obj.curr,number,0,aname,time,type);
                            }
                        }
                    });
                });
            }
            if(data.activitylist.length === 0){
                view.append('<div class="hd_ic_two_no">暂无数据</div>')
            }
            for(var i = 0;i<data.activitylist.length;i++){
                var address = data.activitylist[i].exchangeAddress.split('/');
                var zs = parseInt(data.activitylist[i].goodsNumber)+parseInt(data.activitylist[i].sellNumber);
                if(data.activitylist[i].createrLogo2 === '1'){//商户活动
                    cla = '商户';
                    if(data.activitylist[i].activitystatus === '0'){
                        sta = '已结束';
                        s1 = 'none';
                        s2 = 'block';
                    }
                    else {
                        sta = '进行中';
                        s1 = 'block';
                        s2 = 'none';
                    }
                }
                else {
                    cla = '平台';
                    if(data.activitylist[i].createrLogo1 === '0'){
                        sta = '上架中';
                        s1 = 'block';
                        s2 = 'none';
                    }
                    else {
                        sta = '已下架';
                        s1 = 'none';
                        s2 = 'block';
                    }
                }
                view.append('<div class="hd_item">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="'+ data.activitylist[i].QRCode1 +'">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">'+ data.activitylist[i].joinnumber +'</span></div>\n' +
                    '                            <div class="hd_item_sort">'+ cla +'</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="'+ data.activitylist[i].activityName +'">'+ data.activitylist[i].activityName +'</div>\n' +
                    '                        <div class="hd_item_address" title="'+ address[0] +'">'+ address[0] +'</div>\n' +
                    '                      <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">'+ data.activitylist[i].realprice +'</span></div>\n'+
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">'+ data.activitylist[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_com">佣金：<span>'+ data.activitylist[i].commissionMoney +'</span></div>\n' +
                    '                            <div class="hd_item_processing" style="display: '+s1+'">'+ sta +'</div>\n' +
                    '                            <div class="hd_item_processingtwo" style="display: '+s2+';">'+ sta +'</div>\n' +
                    '                        </div>\n' +
                    '                      <div class="hd_item_undercover" style="display: '+s2+';"></div>\n'+
                    '                    </div>\n' +
                    '                   <div class="hd_item_ew">\n' +
                    '                        <div class="hd_item_endtime">结束时间:'+data.activitylist[i].overTime+'</div>\n' +
                    '                        <div class="hd_item_shopbox">购买:<span class="hd_shop">'+ data.activitylist[i].sellNumber +'/'+zs+'</span></div>\n' +
                    '                    </div>\n'+
                    '                </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//商户页--》商户活动的退出
$('.new_cannel').click(function () {
    $('.new_boxtwo').animate({
        opacity:0
    },function () {
        $('.new_boxtwo').hide();
    });
});
//商户页--》商户活动列表的搜索功能
function mase() {
    var spid = $('.new_boxtwo').attr('data-id');
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/280);
    var name = $('#mcname').val();
    var time = $('#mctime').val();
    viewac(spid,1,number,1,name,time,$('.hd_ic_oneadd').attr('data-id'));
}
//商户页--》还原密码弹框
function reduction(e) {
    $('.reduction').css('opacity',0).attr('data-id',e).show().animate({
        opacity:1
    });
}
//商户页--》还原密码取消
$('.redu_cannel').click(function () {
    $('.reduction').animate({
        opacity:0
    },function () {
        $('.reduction').css({'display':'none'},{'opacity':1});
    });
});
//商户页--》还原密码确定
$('.redu_ok').click(function () {
    var data = {account:$('.reduction').attr('data-id')};
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/restorepassword',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            $('.reduction').animate({
                opacity:0
            },function () {
                $('.reduction').css({'display':'none'},{'opacity':1});
                readmerchant(1,0);
            });
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
});
//商户页--》商家具体活动分类点击
$('.hd_ic_onetitle').click(function () {
    $('.hd_ic_onetitle').removeClass('hd_ic_oneadd');
    $(this).addClass('hd_ic_oneadd');
    var id = $('.new_boxtwo').attr('data-id');
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/280);
    var sta = $(this).attr('data-id');
    viewac(id,1,number,1,'','',sta);
});

//团长管理-->金牌普通团长的切换
$('.head_header_item').click(function () {
    $('.head_header_item').toggleClass('head_header_itemadd')
});


//活动展示界面功能
var num;
//活动展示-->进入最新活动列表
$('#new_add').click(function () {
    $('.hd_increase').show();
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/300);
    nhread(1,number,0,1)
});
//活动展示-->进入最热活动列表
$('#hot_add').click(function () {
    $('.hd_increase').show();
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/300);
    nhread(1,number,1,1)
});
//活动展示--》进入banner活动列表
$('#banner_add').click(function () {
    $('.hd_increase').show();
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/300);
    nhread(1,number,2,1);
});
//活动展示-->活动列表读取
function nhread(page,numbe,cla,k) {//page代表页码。numbe代表最大数据数目，cla代表是最新还是热门或者banner，k代表是第一次，需要初始化页码
    var hd = $('.hd_ic_two'),a,b,c;
    hd.children().remove();
    $('#acshow_select').attr('data-status',cla);
    var n = numbe*3;
    if(cla === 0){//最新
        a = '0';
        b ='';
        c = '';
    }
    else if(cla === 1){//热门
        a = '';
        b = '0';
        c = ''
    }
    else {
        a = '';
        b = '';
        c = '0'
    }
    var data = {createrLogo1:0,createrLogo2:'0',activitystatus:'',shopId:'',nowPage:page,eachNumber:n,newstatus:a,hotstatus:b,banner:c};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/getActivities',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(k === 1){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'hd_page' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: data.totalNum-num //数据总数
                        ,limit:n
                        ,jump: function(obj,fa){
                            if(!fa){
                                nhread(obj.curr,numbe,cla);
                            }
                        }
                    });
                });
            }
            for(var i = 0;i<data.activities.length;i++){
                var address = data.activities[i].exchangeAddress.split('/');
                var numb = parseInt(data.activities[i].sellNumber) + parseInt(data.activities[i].goodsNumber);
                hd.append('<div class="hd_item" onclick="senewhot('+ cla +',$(this))" ' +
                    'data-id="'+ data.activities[i].activityId +'">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="'+ data.activities[i].QRCode1 +'">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">'+ data.activities[i].joinnumber +'</span></div>\n' +
                    '                            <div class="hd_item_shopbox">购买:<span class="hd_shop">'+ data.activities[i].sellNumber+'/'+ numb +'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="' + data.activities[i].activityName + '">'+ data.activities[i].activityName +'</div>\n' +
                    '                        <div class="hd_item_address" title="'+ address[0] +'">'+ address[0] +'</div>\n' +
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">'+ data.activities[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">'+ data.activities[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_share">去分享</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//活动展示-->选中活动为最新或者热门
function senewhot(n,e) {
    var id = e.attr('data-id');
    if(n === 0){//最新
        $('.bullet').show().attr('data-id',id);
        $('#bullet_name').text('最新');
    }
    else if(n === 1){//热门
        $('.bullet').show().attr('data-id',id);
        $('#bullet_name').text('热门');
    }
    else {
        $('.bullet').show().attr('data-id',id);
        $('#bullet_name').text('Banner');
    }
}
//活动展示-->取消选中状态
$('.bullet_canel').click(function () {
    $('.bullet').hide();
});
//活动展示-->确定选中
$('.bullet_ok').click(function () {
    var a,b,c;
    var te = $('#bullet_name').text();
    if( te=== '最新'){
        a = '1';
        b = '';
        c = ''
    }
    else if(te === '热门'){
        a = '';
        b = '1';
        c = ''
    }
    else {
        a = '';
        b = '';
        c = '1';
    }
    var data = {activityId:$('.bullet').attr('data-id'),newstatus:a,hotstatus:b,banner:c};
    $.ajax({
        url:$href + 'MarketPlatform/activity/updateactivity',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(data.result === 'success'){
                $('.bullet').hide();
                $('.hd_increase').hide();
                readhd();
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
});
//活动展示-->关闭活动列表页
$('.hd_cannel').click(function () {
    $('.hd_increase').hide();
});
//活动展示-->初始化活动展示页数据列表ok
function readhd() {
    var ne = $('#hd_content_new'),hot = $('#hd_content_hot'),ban = $('#hd_content_banner');
    ne.children().remove('.hd_item');
    hot.children().remove('.hd_item');
    ban.children().remove('.hd_item');
    var data = {createrLogo1:'0',createrLogo2:'0',activitystatus:'',shopId:'',nowPage:'',eachNumber:'',newstatus:1,hotstatus:'',banner:''};
    $.ajax({
        url:$href + 'MarketPlatform/activity/getActivities',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            num = data.activities.length;
            for(var i = 0;i<data.activities.length;i++){
                var address = data.activities[i].exchangeAddress.split('/');
                var numb = parseInt(data.activities[i].sellNumber) + parseInt(data.activities[i].goodsNumber);
                $('#new_add').before('<div class="hd_item" data-id="'+ data.activities[i].activityId +'">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="'+ data.activities[i].QRCode1 +'">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">'+ data.activities[i].joinnumber +'</span></div>\n' +
                    '                            <div class="hd_item_shopbox">购买:<span class="hd_shop">'+ data.activities[i].sellNumber+ '/'+ numb +'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="'+ data.activities[i].activityName +'">'+ data.activities[i].activityName +'</div>\n' +
                    '                        <div class="hd_item_address" title="'+ address[0] +'">'+ address[0] +'</div>\n' +
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">'+ data.activities[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">'+ data.activities[i].realprice +'</span></div>\n' +
                    '                            <div class="hd_item_share">去分享</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="hd_item_remove" onclick="acshowremove($(this),0)"></div>\n' +
                    '                </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
    var dat = {createrLogo1:'0',createrLogo2:'0',activitystatus:'',shopId:'',nowPage:'',eachNumber:'',newstatus:'',hotstatus:1,banner:''};
    $.ajax({
        url:$href + 'MarketPlatform/activity/getActivities',
        type:'post',
        data:JSON.stringify(dat),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            for(var i = 0;i<data.activities.length;i++) {
                var numb = parseInt(data.activities[i].sellNumber) + parseInt(data.activities[i].goodsNumber);
                var address = data.activities[i].exchangeAddress.split('/');
                $('#hot_add').before('<div class="hd_item" data-id="' + data.activities[i].activityId + '">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="' + data.activities[i].QRCode1 + '">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">' + data.activities[i].joinnumber + '</span></div>\n' +
                    '                            <div class="hd_item_shopbox">购买:<span class="hd_shop">' + data.activities[i].sellNumber + '/'+ numb + '</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                    '                        <div class="hd_item_address" title="' + address[0] + '">' + address[0] + '</div>\n' +
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">' + data.activities[i].nowprice + '</span></div>\n' +
                    '                            <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">' + data.activities[i].realprice + '</span></div>\n' +
                    '                            <div class="hd_item_share">去分享</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="hd_item_remove" onclick="acshowremove($(this),1)"></div>\n' +
                    '                </div>');
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
    var da = {createrLogo1:'0',createrLogo2:'0',activitystatus:'',shopId:'',nowPage:'',eachNumber:'',newstatus:'',hotstatus:'',banner:1};
    $.ajax({
        url:$href + 'MarketPlatform/activity/getActivities',
        type:'post',
        data:JSON.stringify(da),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            for(var i = 0;i<data.activities.length;i++) {
                var address = data.activities[i].exchangeAddress.split('/');
                $('#banner_add').before('<div class="hd_item" data-id="' + data.activities[i].activityId + '">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="' + data.activities[i].QRCode1 + '">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">' + data.activities[i].joinnumber + '</span></div>\n' +
                    '                            <div class="hd_item_shopbox">购买:<span class="hd_shop">' + data.activities[i].sellNumber + '</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="' + data.activities[i].activityName + '">' + data.activities[i].activityName + '</div>\n' +
                    '                        <div class="hd_item_address" title="' + address[0] + '">' + address[0] + '</div>\n' +
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">' + data.activities[i].nowprice + '</span></div>\n' +
                    '                            <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">' + data.activities[i].realprice + '</span></div>\n' +
                    '                            <div class="hd_item_share">去分享</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="hd_item_remove" onclick="acshowremove($(this),2)"></div>\n' +
                    '                </div>');
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//活动展示-->活动列表搜索
$('#acshow_select').click(function () {
    var cla = $(this).attr('data-status');
    var height = $('.hd_ic_two').width();
    var number = parseInt(height/300);
    acshowsele(1,number,cla,1);
});
function acshowsele(page,number,cla,k) {
    var hd = $('.hd_ic_two');
    hd.children().remove();
    var n = number*3,a,b,c;
    if(cla === 0||cla === '0'){//最新
        a = '0';
        b ='';
        c = '';
    }
    else if(cla === 1||cla === '1'){
        a = '';
        b = '0';
        c = '';
    }
    else {
        a = '';
        b = '';
        c = '0';
    }
    var data = {shopId:'',createrLogo1:0,createrLogo2:0,nowPage:page,activitystatus:'',activityName:$('#acname').val(),shopName:$('#spname').val(),
        timepoint:$('#actime').val(),eachNumber:n,newstatus:a,hotstatus:b,banner:c};
    $.ajax({
        url:$href + 'MarketPlatform/activity/searchActivities',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(k === 1){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'hd_page' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: data.searchtotalNum //数据总数
                        ,limit:n
                        ,jump: function(obj,fa){
                            if(!fa){
                                acshowsele(obj.curr,number,cla);
                            }
                        }
                    });
                });
            }
            for(var i = 0;i<data.activities.length;i++){
                var address = data.activities[i].exchangeAddress.split('/');
                var numb = parseInt(data.activities[i].sellNumber) + parseInt(data.activities[i].goodsNumber);
                hd.append('<div class="hd_item" onclick="senewhot('+ cla +',$(this))" ' +
                    'data-id="'+ data.activities[i].activityId +'">\n' +
                    '                    <div class="hd_item_main">\n' +
                    '                        <div class="hd_item_img">\n' +
                    '                            <img src="'+ data.activities[i].QRCode1 +'">\n' +
                    '                            <div class="hd_item_hotbox">热度:<span class="hd_hot">'+ data.activities[i].joinnumber +'</span></div>\n' +
                    '                            <div class="hd_item_shopbox">购买:<span class="hd_shop">'+ data.activities[i].sellNumber+'/'+numb +'</span></div>\n' +
                    '                        </div>\n' +
                    '                        <div class="hd_item_name" title="' + data.activities[i].activityName + '">'+ data.activities[i].activityName +'</div>\n' +
                    '                        <div class="hd_item_address" title="'+ address[0] +'">'+ address[0] +'</div>\n' +
                    '                        <div class="hd_item_price">\n' +
                    '                            <div class="hd_item_newprice">平台价：￥<span class="hd_newprice">'+ data.activities[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_oldprice">原价：￥<span class="hd_oldprice">'+ data.activities[i].nowprice +'</span></div>\n' +
                    '                            <div class="hd_item_share">去分享</div>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}
//活动展示-->活动列表移除
function acshowremove(e,n) {//e为自身元素，n为类别(n=0为最新，n=1为热门)
    var a,b,c;
    console.log(n);
    var id = e.parents('.hd_item').attr('data-id');
    if(n === 0) {
        a = '0';
        b = '';
        c = '';
    }
    else if(n === 1){
        a = '';
        b = '0';
        c = '';
    }
    else {
        a = '';
        b = '';
        c = '0';
    }
    var data = {activityId:id,newstatus:a,hotstatus:b,banner:c};

    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/activity/updateactivity',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(data.result === 'success'){
                readhd();
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    });
}


//团长管理--》编辑
$('.infor_edit').click(function () {
    $('.hd_modify_title').text($(this).attr('data-id'));
    $('.hd_modify').show();
});
//团长管理--》编辑取消
$('.hd_modify_cannel').click(function () {
    $('.hd_modify').hide();
});
//团长管理,商家管理--》定位
function po(id,address,sign) {
    $('.position_font').text(address);
    $('.position').css({'opacity':'0','display':'block'}).animate({
        opacity:'1'
    }).attr('data-status',sign);
    if(sign === '1'){//商户
        $('.position').attr('data-id',id);
    }else {
        $('.position').attr('data-page',id);
    }
}
//团长管理，商家管理--》定位确定
$('.position_ok').click(function () {
   var shopid = $('.position').attr('data-id');
   var headid = $('.position').attr('data-page');
   var coor = $('.p_text').val();
   var sign = $('.position').attr('data-status');
    locate(shopid,headid,sign,coor);
});
//团长管理，商家管理--》定位取消
$('.position_cannel').click(function () {
   $('.position').animate({
        opacity:'0'
    },function () {
        $('.position').hide().css('opacity','1');
    })
});
//团长管理
//数据列表读取
function headread(page,k) {
    $('.head_content').children().remove();
    var data = {nowPage:page,eachNumber:10};
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/PTheadergetall',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var a,b,c;
            if(k === '0'||k === 0){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'headPage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count:data.headergetlistnum //数据总数
                        ,limit:10
                        ,jump: function(obj,fa){
                            if(!fa){
                                headread(obj.curr,1);
                            }
                        }
                    });
                });
            }
            if(data.headergetlist.length === 0){
                $('.head_content').append('<div class="content_twono">暂无数据</div>');
                $('.head_pagination').hide();
            }else {
                $('.head_pagination').show();
                for(var i = 0;i<data.headergetlist.length;i++){
                    var d1 ,d2;
                    if(data.headergetlist[i].headercoordinate){//存在值，代表已定位
                        d1 = 'block';d2 = 'none';
                    }else {
                        d1 = 'none';d2 = 'block';
                    }
                    $('.head_content').append(' <div class="head_item">\n' +
                        '                <div class="head_item_one">\n' +
                        '                    <div class="head_item_fontone">\n' +
                        '                        <span>姓名：</span>\n' +
                        '                        <span class="head_name">'+ data.headergetlist[i].headerName +'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="head_item_fontone">\n' +
                        '                        <span>联系方式：</span>\n' +
                        '                        <span class="head_telone">'+ data.headergetlist[i].headertel +'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="head_item_fonttwo">\n' +
                        '                        <span>地址：</span>\n' +
                        '                        <span class="head_teltwo" title="'+ data.headergetlist[i].headeraddress +'">'+ data.headergetlist[i].headeraddress +'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="head_item_fonttwo">\n' +
                        '                        <span>入驻时间：</span>\n' +
                        '                        <span class="head_name">'+ data.headergetlist[i].headerjointime +'</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="head_item_two" onclick="po(\''+data.headergetlist[i].headerId+'\',\'' +
                        ''+data.headergetlist[i].headeraddress+'\',\'2\')" style="display: '+d2+';color:red">定位</div>\n' +
                        '                <div class="head_item_two" style="display: '+d1+'">已定位</div>\n' +
                        '            </div>')
                }
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}

//团长管理、商家管理--》定位功能
function locate(shopid,headerid,sign,coor) {
    var data = {shopId:shopid,headerId:headerid,sign:sign,coordinate:coor};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/seller/setcoordinateaddress',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(sign === '2'){//团长定位
                $('.position').animate({
                    opacity:'0'
                },function () {
                    $('.position').hide().css('opacity','1');
                    headread('1','0')
                })
            }else {//商户定位
                $('.position').animate({
                    opacity:0
                },function () {
                    $('.position').css({'display':'none'},{'opacity':1});
                    readmerchant(1,0);
                });
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//团长申请
//已读未读切换
$('.applicate_c_onefont').click(function () {
    $('.applicate_c_onefont').removeClass('applicate_c_oneadd');
    $(this).addClass('applicate_c_oneadd');
    var applica = $('.applicate_c_two');
    var width = applica.width();
    var number = parseInt(width/322);
    var status = $(this).attr('data-id');
    applica.children().remove();
    appread(status,1,number,0);
});
//列表读取
function appread(status,page,number,k) {
    $('.applicate_c_two').children().remove();
    var data = {readstatus:status,nowPage:page,eachNumber:number*2};
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/PTheaderget',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var a,b,c;
            if(k === '0'||k === 0){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'applicatePage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count:data.headergetlistnum //数据总数
                        ,limit:number*2
                        ,jump: function(obj,fa){
                            if(!fa){
                                appread(status,obj.curr,number,1);
                            }
                        }
                    });
                });
            }
            if(data.headergetlist.length === 0){
                $('.applicate_c_two').append('<div class="content_twono">暂无数据</div>')
                $('.applicate_pagination').hide();
            }else {
                $('.applicate_pagination').show();
                for(var i = 0;i<data.headergetlist.length;i++){
                    if(data.headergetlist[i].joinstatus === '0'){//驳回
                        a = 'none';
                        b = 'none';
                        c = 'block'
                    }else if(data.headergetlist[i].joinstatus === '1'){//通过
                        a = 'none';
                        b = 'block';
                        c = 'none'
                    }else {//待审核
                        a = 'table';
                        b = 'none';
                        c = 'none'
                    }
                    $('.applicate_c_two').append('<div class="applicate_item" data-id="'+ data.headergetlist[i].headerId +'">\n' +
                        '                        <div class="applicate_item_one">\n' +
                        '                            <div class="applicate_item_font">姓名：<span class="appliate_name">'+ data.headergetlist[i].headerName +'</span></div>\n' +
                        '                            <div class="applicate_item_font">电话：<span class="applicate_phone">'+ data.headergetlist[i].headertel +'</span></div>\n' +
                        '                            <div class="applicate_item_font">地址：<span class="applicate_address" ' +
                        'title="'+ data.headergetlist[i].headeraddress +'">'+ data.headergetlist[i].headeraddress +'</span></div>\n' +
                        '                            <div class="application_item_img" style="display: '+ b +'">\n' +
                        '                                <img src="img/application/a_0.png">\n' +
                        '                            </div>\n'+
                        '                            <div class="application_item_img" style="display: '+ c +'">\n' +
                        '                                <img src="img/application/a_1.png">\n' +
                        '                            </div>\n'+
                        '                        </div>\n' +
                        '                        <div class="applicate_item_two" style="display: '+ a +'">\n' +
                        '                            <div class="applicate_item_ok applicate_item_button" onclick="passed($(this),1)">通过</div>\n' +
                        '                            <div class="applicate_item_canel applicate_item_button">驳回</div>\n' +
                        '                        </div>\n' +
                        '                    </div>')
                    }
                }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//申请通过
function passed(e,sta) {
    var id = e.parents('.applicate_item').attr('data-id');
    var data = {headerId:id,joinstatus:sta};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/updateheaderstatus',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var applica = $('.applicate_c_two');
            var width = applica.width();
            var number = parseInt(width/322);
            var status = $('.applicate_c_oneadd').attr('data-id');
            applica.children().remove();
            appread(status,1,number,0);
            alert('请尽快进行团长定位');
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}

//商家申请
//商家申请已读未读切换
$('.mcapplicate_c_onefont').click(function () {
    $('.mcapplicate_c_onefont').removeClass('mcapplicate_c_oneadd');
    $(this).addClass('mcapplicate_c_oneadd');
    var applica = $('.mcapplicate_c_two');
    var width = applica.width();
    var number = parseInt(width/322);
    var status = $(this).attr('data-id');
    applica.children().remove();
    mcappread(status,1,number,0);
});
//列表读取
function mcappread(status,page,number,k) {
    $('.mcapplicate_c_two').children().remove();
    var data = {readstatus:status,nowPage:page,eachNumber:number*2};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/getshopapply',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            var a,b,c;
            if(k === '0'||k === 0){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'applicatePage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count:data.shopapplyinfonum //数据总数
                        ,limit:number*2
                        ,jump: function(obj,fa){
                            if(!fa){
                                mcappread(status,obj.curr,number,1);
                            }
                        }
                    });
                });
            }
            if(data.shopapplyinfolist.length === 0){
                $('.mcapplicate_c_two').append('<div class="content_twono">暂无数据</div>')
                $('.mcapplicate_pagination').hide();
            }else {
                $('.mcapplicate_pagination').show();
                for(var i = 0;i<data.shopapplyinfolist.length;i++){
                    if(data.shopapplyinfolist[i].shopapplystatus === '-1'){//驳回
                        a = 'none';
                        b = 'none';
                        c = 'block'
                    }else if(data.shopapplyinfolist[i].shopapplystatus === '1'){//通过
                        a = 'none';
                        b = 'block';
                        c = 'none'
                    }else {//待审核
                        a = 'table';
                        b = 'none';
                        c = 'none'
                    }
                    $('.mcapplicate_c_two').append('<div class="applicate_item" data-id="'+data.shopapplyinfolist[i].shopapplyId+'">\n' +
                        '                    <div class="applicate_item_one">\n' +
                        '                        <div class="applicate_item_font">姓名：<span class="appliate_name">'+data.shopapplyinfolist[i].leaderName+'</span></div>\n' +
                        '                        <div class="applicate_item_font">电话：<span class="applicate_phone">'+data.shopapplyinfolist[i].tel1+'</span></div>\n' +
                        '                        <div class="applicate_item_font">商户地址：<span class="applicate_address" ' +
                        'title="'+data.shopapplyinfolist[i].shopAddress+'">'+data.shopapplyinfolist[i].shopAddress+'</span></div>\n' +
                        '                        <div class="applicate_item_font">商户名称：<span class="applicate_shopname" ' +
                        'title="'+data.shopapplyinfolist[i].shopName+'">'+data.shopapplyinfolist[i].shopName+'</span></div>\n' +
                        '                        <div class="application_item_img" style="display: '+b+';">\n' +
                        '                            <img src="img/application/a_0.png">\n' +
                        '                        </div>\n' +
                        '                        <div class="application_item_img" style="display: '+c+';">\n' +
                        '                            <img src="img/application/a_1.png">\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                    <div class="applicate_item_two" style="display: '+a+';">\n' +
                        '                        <div class="applicate_item_ok applicate_item_button" onclick="shoppass($(this),1)">通过</div>\n' +
                        '                        <div class="applicate_item_canel applicate_item_button">驳回</div>\n' +
                        '                    </div>\n' +
                        '                </div>')
                }
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//商家申请通过
function shoppass(e,sta) {
    var id = e.parents('.applicate_item').attr('data-id');
    var data = {shopapplyId:id,shopapplystatus:sta};
    console.log(data);
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/changeapplystatus',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(data.result === 'success'){
                $('.new_merchant').show();
                $('#shopName').val(e.parents('.applicate_item').find('.applicate_shopname').text());
                $('#shopAddress').val(e.parents('.applicate_item').find('.applicate_address').text());
                $('#shopprople').val(e.parents('.applicate_item').find('.appliate_name').text());
                $('#shopphoneone').val(e.parents('.applicate_item').find('.applicate_phone').text());
                alert('请尽快进行商户定位');
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//商家申请同意并创建商户
$('.mcapp_ok').click(function () {
    var name = $('#shopName').val();//商家名称
    var addres = $('#shopAddress').val();//商家地址
    var prople = $('#shopprople').val();//商家负责人
    var po = $('#shopphoneone').val();//联系方式1
    var pt = $('#shopphonetwo').val();//联系方式2
    var opentime = $('#opentime').val();//营业时间
    var settime = $('#shoptime').val();//入驻时间
    var fee = $('#merchant_fee').val();//手续费
    var data ;
    if(name === null||name === ''||addres === null||addres===''||prople===null||prople===''||po===null||po===''
        ||opentime===null||opentime===''||settime===null||settime===''){
        alert('请完善商户信息！');
    }
    else {
        data = {shopName:name,shopAddress:addres,workHours:opentime,leaderName:prople,tel1:po,
            tel2:pt,setTime:settime,poundagerates:fee};
        console.log(data);
        $.ajax({
            url:$href + 'MarketPlatform/seller/createSeller',
            type:'post',
            data:JSON.stringify(data),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                console.log(data);
                if(data.result === 'success'){
                    $('.new_merchant').animate({
                        opacity:0
                    },function () {
                        $('.new_merchant').css({'display':'none','opacity':'1'});

                    });
                    var applica = $('.mcapplicate_c_two');
                    var width = applica.width();
                    var number = parseInt(width/322);
                    var status = $('.mcapplicate_c_oneadd').attr('data-id');
                    applica.children().remove();
                    mcappread(status,1,number,0);
                }
                else {
                    alert(data.message);
                }
            },
            error:function () {
                alert('请勿频繁操作');
            }
        });
    }

});



//资金流水
//团长商户导航栏切换
$('.cash_header_item').click(function () {
    $('.cash_header_item').removeClass('cash_header_itemadd');
    $(this).addClass('cash_header_itemadd');
    var id = $(this).attr('data-id');
    cashread(1,id,0);
    if(id === 1||id === '1'){//商户
        $('#headfooter').animate({
            opacity:0
        },function () {
            $('#headfooter').hide(function () {
                $('#shopfooter').css('opacity',0).show().animate({
                    opacity:1
                });
            });
        });
    }else {//团长
        $('#shopfooter').animate({
            opacity:0
        },function () {
            $('#shopfooter').hide(function () {
                $('#headfooter').css({'opacity':0,'display':'table'}).show().animate({
                    opacity:1
                });
            });
        });
    }
});
//初始化数据列表
function cashread(page,point,k) {//page页码,k为0重置页码
    var cash = $('.cash_content');
    cash.children().remove();
    var data = {nowPage:page,point:point};
    console.log(data);
    var myDate = new Date();
    var month=myDate.getMonth()+1;
    var day = myDate.getDate(),m;
    if(day >=15){
        m = month + '月/下';
    }else {
        m = month +'月/上';
    }
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/getmainbook',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(k === 0||k === '0'){
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'cashPage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: data.totalmainbook.totalnum //数据总数
                        ,limit:8
                        ,jump: function(obj,fa){
                            if(!fa){
                                cashread(obj.curr,point)
                            }
                        }
                    });
                });
            }
            if(point === 1||point === '1'){//商户
                $('#totalshopmonthsales').text(data.totalmainbook.totalrealRevenue);//半月销售额
                $('#totalshopsales').text(data.totalmainbook.totalrevenue);//总销售额
                $('#totalshopmonthprofit').text(data.totalshopget);//半月商家收益
                $('#totalshopprofit').text(data.totalallshopget);//商家总收益
                $('#totalshopmonthfee').text(data.totalpoundage);//半月平台收益
                $('#totalshopfee').text(data.totalallpoundage);//平台总收益
                for(var i = 0;i<data.shopmainbook.length;i++){
                    var bf = parseFloat(data.shopmainbook[i].poundagerates)*100 ;
                    bf = bf.toFixed(1) + '%';
                    cash.append('<div class="cash_item">\n' +
                        '                <div class="cash_item_one">\n' +
                        '                    <div class="cash_item_fontone">\n' +
                        '                        <span>商户名称：</span>\n' +
                        '                        <span class="cash_name">'+data.shopmainbook[i].shopName+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo">\n' +
                        '                        <span>联系方式：</span>\n' +
                        '                        <span class="cash_tel">'+data.shopmainbook[i].tel1+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo">\n' +
                        '                        <span>负&nbsp;责&nbsp;人&nbsp;：</span>\n' +
                        '                        <span class="cash_prosonl">'+data.shopmainbook[i].leaderName+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">商家收益</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>商家收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].realRevenue+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>总收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].revenue+'</span>\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">商家纯收益</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>手续费比例：</span>\n' +
                        '                        <span class="cash_prosonl">'+bf+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>纯收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].shopget+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>总纯收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].allshopget+'</span>\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">平台收益</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].poundage+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>总收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.shopmainbook[i].allpoundage+'</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="cash_item_two" onclick="cash(\''+data.shopmainbook[i].shopId+'\',\'\')">查看详情</div>\n' +
                        '            </div>')
                }
            }else{//团长
                $('#totalheadmonthsales').text(data.totalmainbook.totalrealcommission);//半月佣金总额
                $('#totalheadsales').text(data.totalmainbook.totalallcommission);//佣金总额
                $('#totalheadmonthprofit').text(data.totalheaderget);//半月团长佣金收益
                $('#totalheadprofit').text(data.totalallheaderget);//团长佣金总收益
                $('#totalheadmonthfee').text(data.totalpoundage);//半月平台佣金收益
                $('#totalheadfee').text(data.totalallpoundage);//平台佣金总收益
                for(var j = 0;j<data.headermainbook.length;j++){
                    var bfi = parseFloat(data.headermainbook[j].poundagerates)*100;
                    bfi = bfi.toFixed(1) + '%';
                    cash.append('<div class="cash_item">\n' +
                        '                <div class="cash_item_one">\n' +
                        '                    <div class="cash_item_fontone">\n' +
                        '                        <span>团长姓名：</span>\n' +
                        '                        <span class="cash_name">'+data.headermainbook[j].headerName+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo">\n' +
                        '                        <span>联系方式：</span>\n' +
                        '                        <span class="cash_tel">'+data.headermainbook[j].headertel1+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">佣金总额</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>佣金总额：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].realcommission+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>佣金总额：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].allcommission+'</span>\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">佣金收益</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>手续费：</span>\n' +
                        '                        <span class="cash_prosonl">'+bfi+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>佣金收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].headerget+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>佣金总收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].allheaderget+'</span>\n' +
                        '                    </div>\n' +
                        '\n' +
                        '                    <div class="cash_line"></div>\n' +
                        '                    <div class="cash_item_fonttwo" style="text-align: center">\n' +
                        '                        <span style="width: 100%;">平台收益</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo"  style="color: red">\n' +
                        '                        <span><span class="cash_item_m">'+m+'</span>佣金收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].poundage+'</span>\n' +
                        '                    </div>\n' +
                        '                    <div class="cash_item_fonttwo" style="color: red">\n' +
                        '                        <span>佣金总收益：</span>\n' +
                        '                        <span class="cash_prosonl">￥'+data.headermainbook[j].allpoundage+'</span>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="cash_item_two" onclick="cash(\'\',\''+data.headermainbook[j].headerId+'\')">查看详情</div>\n' +
                        '            </div>')
                }
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}

//查看商家具体资金明细
function cash(shopid,headerid) {
    $('.detail_content').children().remove();
    $('.detail').show();
    var data = {shopId:shopid,headerId:headerid};
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/getearninglist',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            if(data.earninglist.length === 0){
                $('.detail_content').append('<div class="detail_no">暂无数据</div>')
            }
            for(var i = 0;i<data.earninglist.length;i++){
                var ab = data.earninglist[i].remark3,st1 = '',st2 = '';
                if(ab === "已到账！"){//资金已到账
                    ab = '已到账';
                    st1 = 'block';
                    st2 = 'none'
                }else {//资金因为未知原因未到账
                    ab = '未到账';
                    st1 = 'none';
                    st2 = 'block';
                }
                $('.detail_content').append('<div class="detail_item">\n' +
                    '                <div class="detail_item_time">'+data.earninglist[i].transfertime+'</div>\n' +
                    '                <div class="detail_item_amount">'+data.earninglist[i].tradingMoney+'</div>\n' +
                    '                <div class="detail_item_remark">'+ab+'</div>\n'+
                    '                <div class="detail_item_no" style="display: '+st1+'">无</div>\n'+
                    '                <div class="detail_item_operate" style="display: '+st2+';">\n' +
                    '                  <div class="detail_item_operating">补账</div> \n' +
                    '                </div>\n'+
                    '            </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}
//关闭商家资金明细窗口
$('.detail_cannel').click(function () {
   $('.detail').hide(500);
});


//员工分红
function employ() {
    var data = {shop:''};
    $.ajax({
        url:$href + 'MarketPlatform/PTYD/getshareinfo',
        type:'post',
        data:JSON.stringify(data),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            console.log(data);
            $('#emp_revenue').text(data.allpoundage);//平台收益
            $('#emp_dividends').text(data.allsharemoney);//员工分红
            $('#emp_sharerate').text(parseFloat(data.sharerate)*100 + '%');//员工分红率
            for(var i = 0;i<data.employeesinfo.length;i++){
                $('.emp_two').append('<div class="emp_two_item">\n' +
                    '                <div class="emp_two_itemheader">\n' +
                    '                    <img src="img/employee/e_0.png">\n' +
                    '                </div>\n' +
                    '                <div class="emp_two_fh">￥</div>\n' +
                    '                <div class="emp_two_itemname">'+data.employeesinfo[i].employeesname+'</div>\n' +
                    '                <div class="emp_two_itemamount">'+data.employeesinfo[i].employeesget+'</div>\n' +
                    '            </div>')
            }
        },
        error:function () {
            alert('请勿频繁操作');
        }
    })
}



//动画延时函数
function cartoon() {
    $('.loading').animate({
        opacity:'0'
    },function () {
        $('.loading').hide().css('opacity','1');
    })
}


// var time = setInterval(notification,500);
//消息提示功能???待定功能
var noti = 0;
function notification() {
    if(noti === 0){
        $('.nav_item_img img').eq(2).attr('src','img/index/h_0_1.png');
        noti = 1;
    }else {
        $('.nav_item_img img').eq(2).attr('src','img/index/h_0_0.png');
        noti = 0;
    }
}

