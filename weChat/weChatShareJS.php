<?php 
    include_once 'weChatId.php';
    include_once 'weChat.php'; 
?>
<!--WeChat
====================================================== -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script language="javascript">

    /*
     * 注意：
     * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
     * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
     * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *
     * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
     * 邮箱地址：weixin-open@qq.com
     * 邮件主题：【微信JS-SDK反馈】具体问题
     * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
     */
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"]; ?>',
        timestamp: '<?php echo $signPackage["timestamp"]; ?>',
        nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
        signature: '<?php echo $signPackage["signature"]; ?>',
        jsApiList: [
            'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'
        ]
    });


    /*--  可动态修改分享内容
    ====================================================== */
    var app = app || {};
    app.wechat = function(){};
    app.wechat.sharecontent = {title: "每个妈妈都是超能特工！",
                               desc:"我为宝宝完成任务的速度超过了98%的妈妈，你还不来挑战一下？",
                               titleformoment:"我为宝宝完成任务的速度超过了98%的妈妈，你还不来挑战一下？",
                               url: "http://h5campaign.createcdigital.com/h5campaign-uat/h5-target/index.php",
                               icon: "http://h5campaign.createcdigital.com/h5campaign-uat/h5-target/img/share.png"
                            };
    app.wechat.set_sharecontent = function(){
        wx.ready(function () {
            // 在这里调用 API
            wx.onMenuShareTimeline({
                title: app.wechat.sharecontent.titleformoment, // 分享标题
                link: app.wechat.sharecontent.url, // 分享链接
                imgUrl: app.wechat.sharecontent.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    
//                  tracking.share('Share on Moments');
                    _hmt.push(['_trackEvent','Share','toShare','moment',1]);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    
                }
            });
            wx.onMenuShareAppMessage({
                title: app.wechat.sharecontent.title, // 分享标题
                desc: app.wechat.sharecontent.desc, // 分享描述
                link: app.wechat.sharecontent.url, // 分享链接
                imgUrl: app.wechat.sharecontent.icon, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                   
//                  tracking.share('Send to Chat');
                    _hmt.push(['_trackEvent','Share','toShare','AppMessage',1]);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数

                }
            });
            wx.onMenuShareQQ({
                title: app.wechat.sharecontent.title, // 分享标题
                desc: app.wechat.sharecontent.desc, // 分享描述
                link: app.wechat.sharecontent.url, // 分享链接
                imgUrl: app.wechat.sharecontent.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    
//                  tracking.share('Share on QQ');
                    _hmt.push(['_trackEvent','Share','toShare','qq',1]);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareWeibo({
                title: app.wechat.sharecontent.title, // 分享标题
                desc: app.wechat.sharecontent.desc, // 分享描述
                link: app.wechat.sharecontent.url, // 分享链接
                imgUrl: app.wechat.sharecontent.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数

//                  tracking.share('Share on Weibo');
                    _hmt.push(['_trackEvent','Share','toShare','Weibo',1]);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            
        });
    };

    app.wechat.set_sharecontent();
    
    
</script>