// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 설정
    setupScrollAnimations();
    
    // 네비게이션 클릭 이벤트 설정
    setupNavigation();
    
    // 카드 호버 효과 설정
    setupCardEffects();
    
    // 숫자 카운터 애니메이션 설정
    setupCounterAnimation();
});

// 스크롤 애니메이션 설정
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer 설정
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // 모든 섹션에 observer 적용
    sections.forEach(section => {
        observer.observe(section);
    });
}

// 네비게이션 설정
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 네비게이션 바 높이 계산
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                // 부드러운 스크롤
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 클릭된 링크 하이라이트
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 스크롤 시 현재 섹션 하이라이트
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionHeight = targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// 카드 효과 설정
function setupCardEffects() {
    const cards = document.querySelectorAll('.genre-card, .artist-card, .impact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 타임라인 카드 효과
    const timelineCards = document.querySelectorAll('.timeline-content');
    
    timelineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
}

// 숫자 카운터 애니메이션
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.impact-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.textContent;
                
                // 숫자 추출
                const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
                
                if (targetNumber) {
                    animateCounter(counter, targetNumber, targetText);
                }
                
                // 애니메이션 후 observer 해제
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// 카운터 애니메이션 함수
function animateCounter(element, targetNumber, originalText) {
    const duration = 2000; // 2초
    const startTime = performance.now();
    const suffix = originalText.replace(/[0-9]/g, '');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart 이징 함수
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentNumber = Math.floor(targetNumber * easeOutQuart);
        element.textContent = currentNumber + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// 페이지 상단으로 이동 버튼 (선택사항)
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 스크롤 시 버튼 표시/숨김
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(100px)';
        }
    });
    
    // 호버 효과
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// 상단 이동 버튼 생성
createBackToTopButton();

// 터치 디바이스 지원
function addTouchSupport() {
    const cards = document.querySelectorAll('.genre-card, .artist-card, .impact-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        });
    });
}

// 터치 지원 추가
addTouchSupport();

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// 접근성을 위한 키보드 네비게이션 스타일
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);

// 디바이스 감지 및 최적화
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // 모바일에서는 호버 효과 대신 터치 효과 사용
        const hoverElements = document.querySelectorAll('.nav-link, .social-links span');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 150);
            });
        });
    }
}

// 디바이스 감지 실행
detectDevice();

// 성능 최적화를 위한 스크롤 디바운싱
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

// 스크롤 이벤트 최적화
const optimizedScrollHandler = debounce(() => {
    // 여기서 스크롤 관련 무거운 작업 수행
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

console.log('K-Pop 소개 페이지가 성공적으로 로드되었습니다! 🎵'); 