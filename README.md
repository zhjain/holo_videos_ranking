### 本地打包

#### 打包命令:

```bash
bun run build
```

#### 将打包后的build文件夹压缩成.zip文件

### 上传到服务器后

#### 删除旧文件夹, 解压并删除压缩包

```bash
rm -r build
unzip build.zip -d build
rm build.zip
```

#### 重启服务:

```bash
systemctl restart my-sveltekit
```
