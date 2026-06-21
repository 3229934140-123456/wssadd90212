const charts = {};

function initCharts() {
    initChannelChart();
    initStoreChart();
    initFunnelChart();
    initStaffChart();
    initCycleChart();
    renderAlertTable(mockData.alertList);
}

function initChannelChart() {
    const el = document.getElementById('channelChart');
    if (!el) return;
    charts.channel = echarts.init(el);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(17, 24, 51, 0.95)',
            borderColor: 'rgba(64, 158, 255, 0.3)',
            textStyle: { color: '#e6f0ff', fontSize: 13 }
        },
        legend: {
            data: ['美团', '新氧'],
            top: 0,
            right: 0,
            textStyle: { color: '#8ba3c7', fontSize: 12 },
            itemWidth: 16,
            itemHeight: 8
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: mockData.channelData.dimensions,
            axisLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.2)' } },
            axisLabel: { color: '#8ba3c7', fontSize: 12 }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#5a7394', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.08)', type: 'dashed' } }
        },
        series: [
            {
                name: '美团',
                type: 'bar',
                data: mockData.channelData.meituan,
                barWidth: 18,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ffd100' },
                        { offset: 1, color: 'rgba(255, 209, 0, 0.3)' }
                    ])
                }
            },
            {
                name: '新氧',
                type: 'bar',
                data: mockData.channelData.xinyang,
                barWidth: 18,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#00b4ff' },
                        { offset: 1, color: 'rgba(0, 180, 255, 0.3)' }
                    ])
                }
            }
        ]
    };
    charts.channel.setOption(option);
}

function initStoreChart() {
    const el = document.getElementById('storeChart');
    if (!el) return;
    charts.store = echarts.init(el);
    renderStoreChart('store');
}

function renderStoreChart(type) {
    const data = type === 'store' ? mockData.storeData.byStore : mockData.storeData.byDoctor;
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(17, 24, 51, 0.95)',
            borderColor: 'rgba(64, 158, 255, 0.3)',
            textStyle: { color: '#e6f0ff', fontSize: 13 }
        },
        legend: {
            data: ['预约数', '到院数', '成交数'],
            top: 0,
            right: 0,
            textStyle: { color: '#8ba3c7', fontSize: 12 },
            itemWidth: 14,
            itemHeight: 8
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: data.names,
            axisLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.2)' } },
            axisLabel: { color: '#8ba3c7', fontSize: 11, interval: 0, rotate: type === 'doctor' ? 20 : 0 }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#5a7394', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.08)', type: 'dashed' } }
        },
        series: [
            {
                name: '预约数',
                type: 'bar',
                data: data.booked,
                barWidth: 14,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#409eff' },
                        { offset: 1, color: 'rgba(64, 158, 255, 0.2)' }
                    ])
                }
            },
            {
                name: '到院数',
                type: 'bar',
                data: data.arrived,
                barWidth: 14,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#36cfc9' },
                        { offset: 1, color: 'rgba(54, 207, 201, 0.2)' }
                    ])
                }
            },
            {
                name: '成交数',
                type: 'bar',
                data: data.closed,
                barWidth: 14,
                itemStyle: {
                    borderRadius: [3, 3, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#52c41a' },
                        { offset: 1, color: 'rgba(82, 196, 26, 0.2)' }
                    ])
                }
            }
        ]
    };
    charts.store.setOption(option);
}

function updateStoreView() {
    const type = document.getElementById('storeFilter').value;
    renderStoreChart(type);
}

function initFunnelChart() {
    const el = document.getElementById('funnelChart');
    if (!el) return;
    charts.funnel = echarts.init(el);
    renderFunnel('all');
}

function renderFunnel(category) {
    const data = mockData.funnelData[category];
    const colors = {
        all: ['#409eff', '#36cfc9', '#52c41a', '#faad14', '#ff4d4f'],
        skin: ['#409eff', '#36cfc9', '#52c41a', '#faad14', '#ff4d4f'],
        dental: ['#52c41a', '#36cfc9', '#409eff', '#faad14', '#ff4d4f'],
        light: ['#722ed1', '#409eff', '#36cfc9', '#faad14', '#ff4d4f'],
        surgery: ['#ff4d4f', '#fa8c16', '#faad14', '#52c41a', '#36cfc9']
    };
    const colorSet = colors[category] || colors.all;

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
            backgroundColor: 'rgba(17, 24, 51, 0.95)',
            borderColor: 'rgba(64, 158, 255, 0.3)',
            textStyle: { color: '#e6f0ff', fontSize: 13 }
        },
        series: [{
            name: '转化漏斗',
            type: 'funnel',
            left: '5%',
            top: 20,
            bottom: 20,
            width: '90%',
            min: 0,
            max: data[0].value,
            minSize: '20%',
            maxSize: '100%',
            sort: 'descending',
            gap: 4,
            label: {
                show: true,
                position: 'inside',
                formatter: '{b}\n{c}人',
                color: '#fff',
                fontSize: 13,
                fontWeight: 500
            },
            labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
            itemStyle: {
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            },
            emphasis: {
                label: { fontSize: 15 }
            },
            data: data.map((item, idx) => ({
                ...item,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colorSet[idx] },
                        { offset: 1, color: adjustOpacity(colorSet[idx], 0.4) }
                    ])
                }
            }))
        }]
    };
    charts.funnel.setOption(option);
}

function adjustOpacity(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function updateFunnel(category) {
    document.querySelectorAll('.funnel-wrapper .filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    renderFunnel(category);
}

function initStaffChart() {
    const el = document.getElementById('staffChart');
    if (!el) return;
    charts.staff = echarts.init(el);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(17, 24, 51, 0.95)',
            borderColor: 'rgba(64, 158, 255, 0.3)',
            textStyle: { color: '#e6f0ff', fontSize: 13 },
            axisPointer: { type: 'shadow' }
        },
        legend: {
            data: ['接待线索数', '有效线索占比(%)'],
            top: 0,
            right: 0,
            textStyle: { color: '#8ba3c7', fontSize: 12 },
            itemWidth: 14,
            itemHeight: 8
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: mockData.staffData.names,
            axisLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.2)' } },
            axisLabel: { color: '#8ba3c7', fontSize: 11 }
        },
        yAxis: [
            {
                type: 'value',
                name: '接待数',
                nameTextStyle: { color: '#5a7394', fontSize: 10 },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#5a7394', fontSize: 11 },
                splitLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.08)', type: 'dashed' } }
            },
            {
                type: 'value',
                name: '占比(%)',
                max: 100,
                nameTextStyle: { color: '#5a7394', fontSize: 10 },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#5a7394', fontSize: 11, formatter: '{value}%' },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: '接待线索数',
                type: 'bar',
                data: mockData.staffData.received,
                barWidth: 20,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#409eff' },
                        { offset: 1, color: 'rgba(64, 158, 255, 0.2)' }
                    ])
                }
            },
            {
                name: '有效线索占比(%)',
                type: 'line',
                yAxisIndex: 1,
                data: mockData.staffData.validRate,
                smooth: true,
                symbolSize: 8,
                lineStyle: { width: 3, color: '#eb2f96' },
                itemStyle: {
                    color: '#eb2f96',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(235, 47, 150, 0.25)' },
                        { offset: 1, color: 'rgba(235, 47, 150, 0.02)' }
                    ])
                },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    lineStyle: { color: '#faad14', type: 'dashed', width: 2 },
                    data: [{ yAxis: 45, label: { formatter: '均值 45%', color: '#faad14' } }]
                }
            }
        ]
    };
    charts.staff.setOption(option);
}

function initCycleChart() {
    const el = document.getElementById('cycleChart');
    if (!el) return;
    charts.cycle = echarts.init(el);

    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(17, 24, 51, 0.95)',
            borderColor: 'rgba(64, 158, 255, 0.3)',
            textStyle: { color: '#e6f0ff', fontSize: 13 }
        },
        legend: {
            data: ['皮肤', '轻医美', '整形外科'],
            top: 0,
            right: 0,
            textStyle: { color: '#8ba3c7', fontSize: 12 },
            itemWidth: 14,
            itemHeight: 8
        },
        grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: mockData.cycleData.days,
            axisLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.2)' } },
            axisLabel: { color: '#8ba3c7', fontSize: 11 }
        },
        yAxis: {
            type: 'value',
            name: '成交人数',
            nameTextStyle: { color: '#5a7394', fontSize: 10 },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#5a7394', fontSize: 11 },
            splitLine: { lineStyle: { color: 'rgba(64, 158, 255, 0.08)', type: 'dashed' } }
        },
        series: [
            {
                name: '皮肤',
                type: 'line',
                data: mockData.cycleData.categoryMap.skin,
                smooth: true,
                symbolSize: 6,
                lineStyle: { width: 2, color: '#36cfc9' },
                itemStyle: { color: '#36cfc9' }
            },
            {
                name: '轻医美',
                type: 'line',
                data: mockData.cycleData.categoryMap.light,
                smooth: true,
                symbolSize: 6,
                lineStyle: { width: 2, color: '#722ed1' },
                itemStyle: { color: '#722ed1' }
            },
            {
                name: '整形外科',
                type: 'line',
                data: mockData.cycleData.categoryMap.surgery,
                smooth: true,
                symbolSize: 6,
                lineStyle: { width: 2, color: '#ff4d4f' },
                itemStyle: { color: '#ff4d4f' }
            }
        ]
    };
    charts.cycle.setOption(option);
}

function renderAlertTable(list) {
    const tbody = document.getElementById('alertTableBody');
    if (!tbody) return;

    const typeMap = {
        night: { label: '夜间漏接', class: 'alert-type-night' },
        repeat: { label: '重复分配', class: 'alert-type-repeat' },
        timeout: { label: '超时未跟进', class: 'alert-type-timeout' },
        highValue: { label: '高值流失', class: 'alert-type-high' }
    };
    const budgetMap = {
        high: { label: '5万+', class: 'budget-high' },
        mid: { label: '1-5万', class: 'budget-mid' },
        low: { label: '1万内', class: 'budget-low' }
    };
    const platformMap = {
        meituan: { label: '美团', tag: 'mt' },
        xinyang: { label: '新氧', tag: 'xy' }
    };

    tbody.innerHTML = list.map(item => {
        const t = typeMap[item.type];
        const b = budgetMap[item.budget];
        const p = platformMap[item.platform];
        return `
            <tr>
                <td><span class="alert-type-tag ${t.class}">${t.label}</span></td>
                <td><span class="tag ${p.tag}">${p.label}</span></td>
                <td style="color:#e6f0ff;">${item.name}</td>
                <td>${item.project}</td>
                <td class="${b.class}">${b.label}</td>
                <td style="max-width:240px;">${item.desc}</td>
                <td>${item.staff}</td>
                <td style="color:#5a7394;">${item.time}</td>
                <td>
                    <div class="action-btn-row">
                        <button class="btn-mini" onclick="handleAlert('assign', '${item.name}')">分配</button>
                        <button class="btn-mini" onclick="handleAlert('recover', '${item.name}')">追回</button>
                        <button class="btn-mini danger" onclick="handleAlert('ignore', '${item.name}')">忽略</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterAlert(type) {
    document.querySelectorAll('.row-5 .filter-btn').forEach((btn, idx) => {
        const types = ['all', 'night', 'repeat', 'timeout', 'highValue'];
        btn.classList.toggle('active', types[idx] === type);
    });

    let filtered;
    if (type === 'all') {
        filtered = mockData.alertList;
    } else {
        filtered = mockData.alertList.filter(item => item.type === type);
    }
    renderAlertTable(filtered);
}

function handleAlert(action, name) {
    const actions = { assign: '已重新分配', recover: '已发起追回流程', ignore: '已标记忽略' };
    showToast(`${name}: ${actions[action]}`);
}

function updateKPI(platform) {
    const d = mockData.kpiData[platform];
    animateNumber('kpiLeads', d.leads, true);
    document.getElementById('kpiConnect').textContent = d.connectRate.toFixed(1) + '%';
    document.getElementById('kpiResponse').innerHTML = d.responseTime.toFixed(1) + '<span class="kpi-unit">分钟</span>';
    document.getElementById('kpiBook').textContent = d.bookRate.toFixed(1) + '%';
    document.getElementById('kpiArrive').textContent = d.arriveRate.toFixed(1) + '%';
    document.getElementById('kpiRoi').textContent = '1 : ' + d.roi.toFixed(1);
}

function animateNumber(id, target, isInt) {
    const el = document.getElementById(id);
    const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
    const duration = 600;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);
        el.textContent = isInt ? current.toLocaleString() : current;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function drillDown(type) {
    const config = mockData.drillData[type];
    if (!config) return;

    document.getElementById('modalTitle').textContent = config.title;

    const summaryHtml = `
        <div class="drill-detail-header">
            ${config.summary.map(s => `
                <div class="drill-stat-card">
                    <div class="num" style="color:${s.color};">${s.num}</div>
                    <div class="label">${s.label}</div>
                </div>
            `).join('')}
        </div>
    `;

    const tableHtml = `
        <table class="drill-table" style="width:100%;border-collapse:collapse;">
            <thead>
                <tr>
                    ${config.columns.map(c => `<th style="padding:12px;text-align:left;background:rgba(64,158,255,0.1);color:#36cfc9;font-size:12px;border-bottom:1px solid rgba(64,158,255,0.2);">${c}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${config.rows.map(row => `
                    <tr>
                        ${row.map(cell => `<td style="padding:12px;border-bottom:1px solid rgba(64,158,255,0.05);color:#8ba3c7;font-size:13px;">${cell}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('modalBody').innerHTML = summaryHtml + tableHtml;
    document.getElementById('drillModal').classList.add('active');
}

function closeModal() {
    document.getElementById('drillModal').classList.remove('active');
}

document.getElementById('drillModal').addEventListener('click', (e) => {
    if (e.target.id === 'drillModal') closeModal();
});

function generateReport() {
    showToast('正在生成每日复盘报告，请稍候...');
    setTimeout(() => {
        showToast('✅ 复盘报告已生成，可通过导出下载');
    }, 1500);
}

function exportData(type) {
    const names = { all: '全部经营数据', ad: '投放调整建议' };
    showToast(`📤 正在导出「${names[type]}」Excel文件...`);
    setTimeout(() => {
        showToast('✅ 导出成功，已下载到本地');
    }, 1200);
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(17, 24, 51, 0.95);
        border: 1px solid rgba(64, 158, 255, 0.4);
        color: #e6f0ff;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        animation: toastIn 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${h}:${m}:${s}`;

    const y = now.getFullYear();
    const mo = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()];
    document.getElementById('currentDate').textContent = `${y}年${mo}月${d}日 ${week}`;
}

function bindEvents() {
    document.querySelectorAll('.kpi-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.kpi-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateKPI(tab.dataset.platform);
        });
    });

    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`已切换至「${btn.textContent}」数据视图`);
        });
    });
}

window.addEventListener('resize', () => {
    Object.values(charts).forEach(chart => chart && chart.resize());
});

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateTime();
    setInterval(updateTime, 1000);
    bindEvents();

    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-20px); } }
    `;
    document.head.appendChild(style);
});
