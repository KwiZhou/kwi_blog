---
title: windows&nginx&ssl配置，实现https访问
date: 2022-2-09
sidebar: 'auto'
categories:
 - 网络
tags:
 - 网络
---
# windows&nginx&ssl配置，实现https访问
## http和https的不同
- 安全性：http信息是明文传输，而https是具有安全性的SSL加密传输协议
- 端口不同：http协议端口为80，而https协议端口为443
- 通信速度不同：http通信速度较快，而https需要加密和解密等操作，通信速度较慢
- 视觉感受：对于http://浏览器的地址栏前会提示不安全，而https://浏览器地址前面有小锁🔒的图标
## windows下配置nginx，实现http访问

- 前提条件：解析好的域名，服务器，windows server 2012系统
- nginx安装：
   - 下载window版的包，官网地址：[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644409098567-f561dfb3-206e-4651-8399-bbd3e4e00920.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=316&id=u06ef15fb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=407&originWidth=588&originalType=binary&ratio=1&rotation=0&showTitle=false&size=187827&status=done&style=none&taskId=ub4de72a1-3c3a-4cd6-8482-b427c485826&title=&width=457)

   - 解压下载好的文件夹并改名为nginx，拷贝到c盘，目录如下

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644411220233-842dba4b-6013-4871-8501-92e75d8585e0.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=217&id=uad2fd1ed&margin=%5Bobject%20Object%5D&name=image.png&originHeight=422&originWidth=893&originalType=binary&ratio=1&rotation=0&showTitle=false&size=196377&status=done&style=none&taskId=u14b9a82a-618c-4076-9cec-351f10c4861&title=&width=459)

   - 打开conf/nginx.conf配置文件

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644411382134-1588e150-720f-4174-b4a1-89949bd4ab8c.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=236&id=u7386bb03&margin=%5Bobject%20Object%5D&name=image.png&originHeight=343&originWidth=697&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110559&status=done&style=none&taskId=u8a899f9f-390b-45c1-acde-3daea549d4d&title=&width=480)

   - 找到如下内容，并修改，注意文件里面有好几个location，而这里修改的是http下的server下的location

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644411940050-1fd54efb-a537-4749-b077-ec18f4265711.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=690&id=uce2c79ba&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1021&originWidth=928&originalType=binary&ratio=1&rotation=0&showTitle=false&size=452017&status=done&style=none&taskId=u9f18ef3b-cbab-4b54-abb9-9a2ec11ef35&title=&width=627)

   - 保存nginx.conf文件
   - cmd进入nginx文件夹，执行start nginx命令
   - 浏览器输入之前解析好的域名，即可实现http访问。（如果出现404，打开任务管理器，关闭所有nginx进程，然后再次执行start nginx命令）
## ssl配置，实现https访问

   - 前提条件：同http
   - 以腾讯云服务器为例，首先申请ssl证书，具体申请步骤见官网，写的比较详细，官网地址：[https://cloud.tencent.com/document/product/400/6814](https://cloud.tencent.com/document/product/400/6814)
   - 登录ssl控制台，在“我的证书”一栏，找到对应的ssl证书，并下载。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644413169008-c54bee9e-1143-47d4-a2c7-9170a2558288.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=127&id=u56c78434&margin=%5Bobject%20Object%5D&name=image.png&originHeight=127&originWidth=1417&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46582&status=done&style=none&taskId=u8e7c9603-8401-451c-b09d-a556e1c540f&title=&width=1417)

   - 下载会得到4个文件，如下所示

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644413225479-253c2941-b15f-4a43-bd31-646d629b2d78.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=184&id=u4c791dd3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=184&originWidth=527&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29016&status=done&style=none&taskId=u77ef7080-7276-4d47-8840-bc09643366c&title=&width=527)

   - 将已获取到的 www.kwikwi.xyz_bundle.crt 安全证书文件和 www.kwikwi.xyz.key 私钥文件拷贝到 Nginx文件夹下的conf目录

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1644413406789-9cc9d5b6-596f-4116-a4bc-01d7bb88dce9.png#clientId=u24adec04-b8e8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=307&id=u97e7a4fd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=307&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63526&status=done&style=none&taskId=u6a46c78c-9e4f-475d-b3a2-ac2a743409c&title=&width=522)

   - 修改conf/nginx.conf配置文件，找到https下的server（默认被#注释掉了），
```json
server {
        listen 443 ssl; 
        server_name www.kwikwi.xyz; 
        ssl_certificate www.kwikwi.xyz_bundle.crt; 
        ssl_certificate_key www.kwikwi.xyz.key; 
        ssl_session_timeout 5m;
        ssl_protocols TLSv1.2 TLSv1.3; 
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
        ssl_prefer_server_ciphers on;
        location / {
            root html; #此处操作同http，配置默认站点主页的目录
            index  index.html;#配置默认站点主页文件名称
        }
    }
```

   - 保存nginx.conf文件，cmd进入nginx文件夹，执行start nginx命令
   - 浏览器输入之前解析好的域名，即可实现https访问。（如果出现错误，可以试试打开任务管理器，关闭所有nginx进程，然后再次执行start nginx命令）
## http自动跳转https的nginx配置

   - 添加一个server配置，如下，然后保存并重新运行nginx。在浏览器中输入[http://www.kwikwi.xyz](http://www.kwikwi.xyz),回车，就会自动跳转到[https://www.kwikwi.xyz](https://www.kwikwi.xyz)。
```json
server {
        listen 443 ssl; 
        server_name www.kwikwi.xyz; 
        ssl_certificate www.kwikwi.xyz_bundle.crt; 
        ssl_certificate_key www.kwikwi.xyz.key; 
        ssl_session_timeout 5m;
        ssl_protocols TLSv1.2 TLSv1.3; 
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
        ssl_prefer_server_ciphers on;
        location / {
            root html; #此处操作同http，配置默认站点主页的目录
            index  index.html;#配置默认站点主页文件名称
        }
    }
 server{
            listen 80;
            server_name www.kwikwi.xyz;
            return 301 https://$host$request_uri;
        }
```
