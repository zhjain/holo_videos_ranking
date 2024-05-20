### 本地打包

#### 打包命令:

```bash
bun run build
```

#### 将打包后的,output文件夹压缩成.zip文件

### 上传到服务器后

#### 删除旧文件夹, 解压并删除压缩包

```bash
rm -r .output
unzip .output.zip -d .output
rm .output.zip
```

#### 重启服务:

```bash
systemctl restart my-nuxt
```