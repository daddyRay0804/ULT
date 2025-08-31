#!/bin/bash

# ULT AI Translator Landing Page Deployment Script
# 自动化部署脚本

set -e

echo "🚀 开始部署 ULT AI 翻译器官网..."

# 检查是否安装了必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI 未安装，正在安装..."
        npm install -g vercel
    fi
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    echo "✅ 依赖检查完成"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    
    # 检查文件完整性
    if [ ! -f "public/en/index.html" ]; then
        echo "❌ 英文版本文件缺失"
        exit 1
    fi
    
    if [ ! -f "public/zh/index.html" ]; then
        echo "❌ 中文版本文件缺失"
        exit 1
    fi
    
    if [ ! -f "public/assets/styles.css" ]; then
        echo "❌ 样式文件缺失"
        exit 1
    fi
    
    if [ ! -f "public/assets/app.js" ]; then
        echo "❌ JavaScript文件缺失"
        exit 1
    fi
    
    echo "✅ 项目构建完成"
}

# 本地测试
test_local() {
    echo "🧪 启动本地测试服务器..."
    
    # 启动本地服务器
    npx serve public -p 8000 &
    SERVER_PID=$!
    
    # 等待服务器启动
    sleep 3
    
    echo "🌐 本地服务器运行在 http://localhost:8000"
    echo "📱 测试英文版本: http://localhost:8000/en/"
    echo "🇨🇳 测试中文版本: http://localhost:8000/zh/"
    echo ""
    echo "按 Ctrl+C 停止本地服务器"
    
    # 等待用户中断
    trap "kill $SERVER_PID; exit" INT
    wait
}

# 部署到Vercel
deploy_vercel() {
    echo "🚀 部署到 Vercel..."
    
    if [ "$1" = "--prod" ]; then
        echo "📤 生产环境部署..."
        vercel --prod
    else
        echo "📤 预览环境部署..."
        vercel
    fi
    
    echo "✅ 部署完成"
}

# 运行测试
run_tests() {
    echo "🧪 运行测试..."
    
    # 启动本地服务器
    npx serve public -p 8000 &
    SERVER_PID=$!
    
    # 等待服务器启动
    sleep 3
    
    echo "🔍 运行 Lighthouse 测试..."
    npx lighthouse http://localhost:8000/en/ --output html --output-path ./lighthouse-report.html --chrome-flags="--headless"
    
    echo "♿ 检查可访问性..."
    npx axe-core http://localhost:8000/en/ --exit
    
    # 停止服务器
    kill $SERVER_PID
    
    echo "✅ 测试完成"
    echo "📊 Lighthouse 报告: ./lighthouse-report.html"
}

# 显示帮助信息
show_help() {
    echo "ULT AI 翻译器官网部署脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  dev         启动本地开发服务器"
    echo "  test        运行测试 (Lighthouse + 可访问性)"
    echo "  deploy      部署到 Vercel 预览环境"
    echo "  deploy:prod 部署到 Vercel 生产环境"
    echo "  help        显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 dev           # 启动本地开发"
    echo "  $0 test          # 运行测试"
    echo "  $0 deploy        # 部署预览版"
    echo "  $0 deploy:prod   # 部署生产版"
}

# 主函数
main() {
    case "${1:-help}" in
        "dev")
            check_dependencies
            build_project
            test_local
            ;;
        "test")
            check_dependencies
            build_project
            run_tests
            ;;
        "deploy")
            check_dependencies
            build_project
            deploy_vercel
            ;;
        "deploy:prod")
            check_dependencies
            build_project
            deploy_vercel --prod
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 运行主函数
main "$@"
