// ============ PRODUCT DATA ============
const products = {
    bananas: {
        name: 'Bananas',
        unit: 'kg',
        currentOrder: 100,
        recommendedOrder: 82,
        expectedSales: 79,
        currentWriteOff: 20,
        recommendedWriteOff: 3,
        price: 2.5,
        historicalDemand: [85, 88, 82, 90, 86, 84, 89, 87, 83, 91, 85, 88],
        forecast: [84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    milk: {
        name: 'Milk',
        unit: 'L',
        currentOrder: 150,
        recommendedOrder: 128,
        expectedSales: 124,
        currentWriteOff: 28,
        recommendedWriteOff: 4,
        price: 1.8,
        historicalDemand: [130, 135, 128, 132, 138, 125, 131, 129, 133, 136, 127, 130],
        forecast: [128, 127, 126, 125, 124, 123, 122, 121, 120, 119, 118, 117],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    meat: {
        name: 'Meat',
        unit: 'kg',
        currentOrder: 80,
        recommendedOrder: 65,
        expectedSales: 62,
        currentWriteOff: 18,
        recommendedWriteOff: 3,
        price: 12,
        historicalDemand: [65, 68, 62, 70, 66, 64, 69, 67, 63, 71, 65, 68],
        forecast: [64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    vegetables: {
        name: 'Vegetables',
        unit: 'kg',
        currentOrder: 120,
        recommendedOrder: 95,
        expectedSales: 91,
        currentWriteOff: 30,
        recommendedWriteOff: 4,
        price: 3,
        historicalDemand: [95, 98, 92, 100, 96, 94, 99, 97, 93, 101, 95, 98],
        forecast: [94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};

// ============ MOBILE MENU ============
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ ANIMATED COUNTERS ============
function animateCounter(element) {
    const target = parseFloat(element.dataset.count);
    const prefix = element.dataset.prefix || '';
    const format = element.dataset.format;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        let value = target * eased;
        
        if (format === 'currency') {
            element.textContent = prefix + Math.round(value).toLocaleString();
        } else if (target < 10) {
            element.textContent = value.toFixed(1) + 'B';
        } else {
            element.textContent = prefix + Math.round(value);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (format === 'currency') {
                element.textContent = prefix + target.toLocaleString();
            } else if (target < 10) {
                element.textContent = target + 'B';
            } else {
                element.textContent = prefix + target;
            }
        }
    }
    
    requestAnimationFrame(update);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ============ PROGRESS BARS ANIMATION ============
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.dataset.width;
            setTimeout(() => {
                fill.style.width = width + '%';
            }, 300);
            progressObserver.unobserve(fill);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill').forEach(fill => {
    progressObserver.observe(fill);
});

// ============ FADE IN ANIMATIONS ============
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .feature-card, .customer-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    fadeObserver.observe(card);
});

// ============ PRODUCT SELECTOR ============
function selectProduct(productId) {
    // Update active button
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-product="${productId}"]`).classList.add('active');
    
    // Update dashboard
    updateDashboard(productId);
}

// Add event listeners to product buttons
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        selectProduct(btn.dataset.product);
    });
});

// ============ UPDATE DASHBOARD ============
function updateDashboard(productId) {
    const product = products[productId];
    const writeOffReduction = ((product.currentWriteOff - product.recommendedWriteOff) / product.currentWriteOff) * 100;
    const financialSavings = (product.currentWriteOff - product.recommendedWriteOff) * product.price;
    
    // Calculate max value for chart scaling
    const maxDemand = Math.max(...product.historicalDemand, ...product.forecast);
    
    // Generate chart bars
    let chartBars = '';
    product.months.forEach((month, index) => {
        const histHeight = (product.historicalDemand[index] / maxDemand) * 180;
        const foreHeight = (product.forecast[index] / maxDemand) * 180;
        
        chartBars += `
            <div class="chart-bar-group">
                <div class="chart-bars-inner">
                    <div class="chart-bar historical" 
                         style="height: ${histHeight}px" 
                         data-value="Historical: ${product.historicalDemand[index]} ${product.unit}"></div>
                    <div class="chart-bar forecast" 
                         style="height: ${foreHeight}px" 
                         data-value="Forecast: ${product.forecast[index]} ${product.unit}"></div>
                </div>
                <div class="chart-month">${month}</div>
            </div>
        `;
    });
    
    const dashboardHTML = `
        <!-- Key metrics -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-label">📊 Current Order</div>
                <div class="metric-value">${product.currentOrder} ${product.unit}</div>
            </div>
            <div class="metric-card green">
                <div class="metric-label">📉 AI Recommendation</div>
                <div class="metric-value">${product.recommendedOrder} ${product.unit}</div>
            </div>
            <div class="metric-card blue">
                <div class="metric-label">📈 Expected Sales</div>
                <div class="metric-value">${product.expectedSales} ${product.unit}</div>
            </div>
            <div class="metric-card amber">
                <div class="metric-label">💰 Write-off Reduction</div>
                <div class="metric-value">${writeOffReduction.toFixed(0)}%</div>
            </div>
        </div>
        
        <!-- Chart -->
        <div class="chart-container">
            <div class="chart-title">Demand Forecast Analysis - ${product.name}</div>
            <div class="chart-bars">
                ${chartBars}
            </div>
            <div class="chart-legend">
                <div class="legend-item">
                    <div class="legend-color historical"></div>
                    <span>Historical Demand</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color forecast"></div>
                    <span>AI Forecast</span>
                </div>
            </div>
        </div>
        
        <!-- Before/After comparison -->
        <div class="before-after-grid">
            <div class="comparison-card before-card">
                <h4 class="comparison-title">Current Approach</h4>
                <div class="comparison-row">
                    <span>Order</span>
                    <span>${product.currentOrder} ${product.unit}</span>
                </div>
                <div class="comparison-row">
                    <span>Sold</span>
                    <span>${product.expectedSales} ${product.unit}</span>
                </div>
                <div class="comparison-row negative">
                    <span>Written off</span>
                    <span>${product.currentWriteOff} ${product.unit}</span>
                </div>
            </div>
            <div class="comparison-card after-card">
                <h4 class="comparison-title">With SaveFood AI</h4>
                <div class="comparison-row">
                    <span>Order</span>
                    <span>${product.recommendedOrder} ${product.unit}</span>
                </div>
                <div class="comparison-row">
                    <span>Sold</span>
                    <span>${product.expectedSales} ${product.unit}</span>
                </div>
                <div class="comparison-row positive">
                    <span>Written off</span>
                    <span>${product.recommendedWriteOff} ${product.unit}</span>
                </div>
            </div>
        </div>
        
        <!-- Savings -->
        <div style="text-align: center; margin-top: 30px;">
            <div class="savings-badge">
                💰 Estimated savings: $${financialSavings.toFixed(2)} per order cycle
            </div>
        </div>
        
        <!-- Note -->
        <div class="demo-note">
            <span>ℹ️</span>
            <p>Example from product presentation. This is not independently verified real-world performance. 
            Demonstration example. Actual results depend on store size, product categories and data quality.</p>
        </div>
    `;
    
    const dashboard = document.getElementById('dashboard');
    dashboard.style.opacity = '0';
    dashboard.innerHTML = dashboardHTML;
    
    // Trigger reflow for animation
    void dashboard.offsetWidth;
    dashboard.style.transition = 'opacity 0.5s ease';
    dashboard.style.opacity = '1';
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard with bananas
    updateDashboard('bananas');
    
    // Add scroll reveal animations
    const scrollReveal = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initial check
});