// ULT AI Translator Landing Page JavaScript
// 注意：此文件不包含任何语言切换逻辑，仅处理页面交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initFAQ();
    initAIAssistant();
    initScrollAnimations();
    initSmoothScrolling();
    updateYear();
});

// FAQ 展开/收起功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            // 设置初始状态
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            
            question.addEventListener('click', function() {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                // 关闭其他所有FAQ项
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherQuestion && otherAnswer) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherAnswer.setAttribute('aria-hidden', 'true');
                        }
                    }
                });
                
                // 切换当前项
                question.setAttribute('aria-expanded', !isExpanded);
                answer.setAttribute('aria-hidden', isExpanded);
                
                // 添加键盘支持
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            });
        }
    });
}

// AI 助手功能
function initAIAssistant() {
    const aiToggle = document.querySelector('.ai-toggle');
    const aiModal = document.querySelector('.ai-modal');
    const aiClose = document.querySelector('.ai-modal-close');
    const aiForm = document.querySelector('.ai-form');
    const aiSaveBtn = document.querySelector('.ai-save-btn');
    
    if (!aiToggle || !aiModal) return;
    
    // 打开AI助手
    aiToggle.addEventListener('click', function() {
        aiModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // 焦点管理
        const firstInput = aiModal.querySelector('input, textarea');
        if (firstInput) {
            firstInput.focus();
        }
        
        // 添加键盘事件监听
        document.addEventListener('keydown', handleEscapeKey);
    });
    
    // 关闭AI助手
    function closeAIModal() {
        aiModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
        
        // 将焦点返回到触发按钮
        aiToggle.focus();
    }
    
    // ESC键关闭
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeAIModal();
        }
    }
    
    // 点击关闭按钮
    if (aiClose) {
        aiClose.addEventListener('click', closeAIModal);
    }
    
    // 点击模态框外部关闭
    aiModal.addEventListener('click', function(e) {
        if (e.target === aiModal) {
            closeAIModal();
        }
    });
    
    // 保存AI助手配置
    if (aiForm && aiSaveBtn) {
        aiSaveBtn.addEventListener('click', function() {
            const formData = new FormData(aiForm);
            const config = {
                prompt: formData.get('prompt') || '',
                apiKey: formData.get('apiKey') || '',
                baseUrl: formData.get('baseUrl') || ''
            };
            
            // 保存到本地存储
            try {
                localStorage.setItem('ult-ai-config', JSON.stringify(config));
                console.info('AI配置已保存到本地存储:', config);
                
                // 显示成功消息
                showNotification('配置已保存', 'success');
                
                // 延迟关闭模态框
                setTimeout(closeAIModal, 1000);
            } catch (error) {
                console.error('保存配置失败:', error);
                showNotification('保存失败，请重试', 'error');
            }
        });
    }
    
    // 加载已保存的配置
    loadAIConfig();
}

// 加载AI配置
function loadAIConfig() {
    try {
        const savedConfig = localStorage.getItem('ult-ai-config');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // 填充表单字段
            const promptInput = document.querySelector('input[name="prompt"]');
            const apiKeyInput = document.querySelector('input[name="apiKey"]');
            const baseUrlInput = document.querySelector('input[name="baseUrl"]');
            
            if (promptInput) promptInput.value = config.prompt || '';
            if (apiKeyInput) apiKeyInput.value = config.apiKey || '';
            if (baseUrlInput) baseUrlInput.value = config.baseUrl || '';
        }
    } catch (error) {
        console.error('加载AI配置失败:', error);
    }
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

// 平滑滚动到锚点
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 更新URL（不刷新页面）
                history.pushState(null, null, '#' + targetId);
            }
        });
    });
}

// 更新年份
function updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="关闭通知">×</button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // 自动关闭（5秒后）
    setTimeout(() => {
        if (notification.parentNode) {
            closeBtn.click();
        }
    }, 5000);
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    // 这里可以添加滚动相关的优化逻辑
    // 例如：懒加载图片、更新导航栏状态等
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误上报逻辑
});

// 页面可见性API支持
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时的处理
        console.info('页面已隐藏');
    } else {
        // 页面显示时的处理
        console.info('页面已显示');
    }
});

// 导出函数供外部使用（如果需要）
window.ULTApp = {
    showNotification,
    loadAIConfig
};
