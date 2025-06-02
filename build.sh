#!/bin/bash

# 构建 Linux 可执行文件
 cross build --release --target x86_64-unknown-linux-musl
 # 构建 Windows 可执行文件
 # cross build --release --target x86_64-pc-windows-gnu