const charts = {};
let currentFunnelCategory = 'all';
let currentFunnelStage = 0;
let currentDrillType = '';
let currentDrillFilters = { platform: 'all', project: 'all', budget: 'all' };

function initCharts() {
    initChannelChart();
    initStoreChart();
    initFunnelChart();
    initStaffChart();
    initCycleChart();
    renderAlertTable(mockData.alertList);
    renderFunnelReasonDetail();
    bindFunnelStageEvents();
    bindStaffChartClick();
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
    currentFunnelCategory = category === 'all' ? 'skin' : category;
    const data = mockData.funnelData[category === 'all' ? 'all' : category];
    const colors = {
        all: ['#409eff', '#36cfc9', '#52c41a', '#faad14', '#ff4d4f'],
        skin: ['#409eff', '#36cfc9', '#52c41a', '#faad14', '#ff4d4f'],
        dental: ['#52c41a', '#36cfc9', '#409eff', '#faad14', '#ff4d4f'],
        light: ['#722ed1', '#409eff', '#36cfc9', '#faad14', '#ff4d4f'],
        surgery: ['#ff4d4f', '#fa8c16', '#faad14', '#52c41a', '#36cfc9']
    };
    const colorSet = colors[category === 'all' ? 'all' : category] || colors.all;

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
    renderFunnelReasonDetail();
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

function bindFunnelStageEvents() {
    document.querySelectorAll('.stage-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.stage-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFunnelStage = parseInt(tab.dataset.stage);
            renderFunnelReasonDetail();
        });
    });
}

function renderFunnelReasonDetail() {
    const container = document.getElementById('funnelReasonDetail');
    if (!container) return;

    const category = currentFunnelCategory;
    if (!mockData.funnelReasons[category]) {
        container.innerHTML = '<p style="color:#5a7394;font-size:13px;text-align:center;padding:20px;">请选择具体项目查看流失原因分析</p>';
        return;
    }

    const stage = mockData.funnelReasons[category].stages[currentFunnelStage];
    if (!stage) return;

    const funnelData = mockData.funnelData[category];
    const entryValue = funnelData[currentFunnelStage] ? funnelData[currentFunnelStage].value : 0;
    const exitValue = funnelData[currentFunnelStage + 1] ? funnelData[currentFunnelStage + 1].value : 0;
    const conversionRate = entryValue > 0 ? ((exitValue / entryValue) * 100).toFixed(1) : 0;

    container.innerHTML = `
        <div class="loss-stat-row">
            <div class="loss-stat-item">
                <div class="label">流失人数</div>
                <div class="value">${stage.loss}人</div>
            </div>
            <div class="loss-stat-item">
                <div class="label">环节转化率</div>
                <div class="value ${conversionRate < 40 ? '' : 'ok'}">${conversionRate}%</div>
            </div>
        </div>

        <div class="reason-block">
            <h5>主要流失原因</h5>
            ${stage.reasons.map(r => `<div class="reason-item">${r}</div>`).join('')}
        </div>

        <div class="reason-block">
            <h5>TOP话术问题</h5>
            ${stage.topProblems.map(p => `<div class="reason-item">${p}</div>`).join('')}
        </div>

        <div class="script-block">
            <h5>建议话术（晨会直接用）</h5>
            ${stage.suggestScripts.map(s => `<div class="script-item">${s}</div>`).join('')}
        </div>
    `;
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
            axisLabel: { 
                color: '#8ba3c7', 
                fontSize: 11,
                formatter: function(value) {
                    return '{b|' + value + '}';
                },
                rich: {
                    b: {
                        color: '#8ba3c7',
                        fontSize: 11,
                        cursor: 'pointer'
                    }
                }
            },
            triggerEvent: true
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
                symbolSize: 10,
                lineStyle: { width: 3, color: '#eb2f96' },
                itemStyle: {
                    color: '#eb2f96',
                    borderColor: '#fff',
                    borderWidth: 2,
                    cursor: 'pointer'
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

function bindStaffChartClick() {
    if (charts.staff) {
        charts.staff.on('click', function(params) {
            if (params.componentType === 'series') {
                const staffName = params.name || mockData.staffData.names[params.dataIndex];
                openStaffDetail(staffName);
            }
        });
    }
}

function openStaffDetail(name) {
    const detail = mockData.staffDetail[name];
    if (!detail) {
        const defaultDetail = generateDefaultStaffDetail(name);
        renderStaffDetailModal(name, defaultDetail);
    } else {
        renderStaffDetailModal(name, detail);
    }
}

function generateDefaultStaffDetail(name) {
    const idx = mockData.staffData.names.indexOf(name);
    const received = mockData.staffData.received[idx];
    const validRate = mockData.staffData.validRate[idx];
    const responseTime = mockData.staffData.responseTime[idx];
    const valid = Math.floor(received * validRate / 100);
    const booked = Math.floor(valid * 0.5);
    const arrived = Math.floor(booked * 0.55);
    const closed = Math.floor(arrived * 0.45);

    return {
        avatar: '👩‍💼',
        level: '⭐⭐ 咨询师',
        joinDate: '2024-06-01',
        platformSplit: { meituan: Math.floor(received * 0.6), xinyang: received - Math.floor(received * 0.6) },
        performance: {
            接待总量: received,
            有效线索: valid,
            有效率: validRate + '%',
            预约数: booked,
            预约率: ((booked / valid) * 100).toFixed(1) + '%',
            到院数: arrived,
            到院率: ((arrived / booked) * 100).toFixed(1) + '%',
            成交数: closed,
            成交率: ((closed / arrived) * 100).toFixed(1) + '%',
            平均首响: responseTime + '分钟',
            首响达标率: responseTime <= 5 ? '95%' : responseTime <= 8 ? '75%' : '55%',
            客单价: '3.5万',
            总业绩: (closed * 3.5).toFixed(1) + '万'
        },
        responseTimeout: {
            total: Math.floor(received * (responseTime > 5 ? 0.3 : 0.1)),
            detail: []
        },
        conversionDetail: [
            { stage: '咨询→有效', rate: validRate + '%', benchmark: '45%', status: validRate >= 55 ? '优秀' : validRate >= 45 ? '正常' : '偏低' },
            { stage: '有效→预约', rate: ((booked / valid) * 100).toFixed(1) + '%', benchmark: '48%', status: (booked / valid) >= 0.55 ? '优秀' : (booked / valid) >= 0.45 ? '正常' : '偏低' },
            { stage: '预约→到院', rate: ((arrived / booked) * 100).toFixed(1) + '%', benchmark: '55%', status: (arrived / booked) >= 0.6 ? '优秀' : (arrived / booked) >= 0.5 ? '正常' : '偏低' },
            { stage: '到院→成交', rate: ((closed / arrived) * 100).toFixed(1) + '%', benchmark: '45%', status: (closed / arrived) >= 0.55 ? '优秀' : (closed / arrived) >= 0.4 ? '正常' : '偏低' }
        ],
        recentLeads: [
            { name: '客户A', project: '皮肤项目', budget: '2万', status: '咨询中', date: '06-22' },
            { name: '客户B', project: '注射美容', budget: '1.5万', status: '待到院', date: '06-21' }
        ],
        feedback: [
            '数据表现正常，继续保持',
            '建议：加强高客单项目沟通技巧'
        ]
    };
}

function renderStaffDetailModal(name, detail) {
    const modal = document.getElementById('drillModal');
    const container = document.querySelector('.modal-container');
    container.classList.add('large');
    document.getElementById('modalTitle').textContent = `👤 ${name} 绩效详情`;

    const meituanPct = ((detail.platformSplit.meituan / detail.performance.接待总量) * 100).toFixed(0);
    const xinyangPct = 100 - meituanPct;

    const statusClass = { '优秀': 'good', '良好': 'good', '正常': 'normal', '偏低': 'bad', '严重偏低': 'bad' };

    document.getElementById('modalBody').innerHTML = `
        <div class="staff-detail-header">
            <div class="staff-avatar">${detail.avatar}</div>
            <div class="staff-info">
                <div class="staff-name">${name}</div>
                <div class="staff-level">${detail.level}</div>
                <div class="staff-meta">
                    <span>入职日期：${detail.joinDate}</span>
                    <span class="staff-platform-split">
                        平台分布：
                        <div class="platform-bar">
                            <div class="meituan" style="width:${meituanPct}%"></div>
                            <div class="xinyang" style="width:${xinyangPct}%"></div>
                        </div>
                        <span style="color:#ffd100;">美团 ${detail.platformSplit.meituan}</span>
                        <span style="color:#00b4ff;">新氧 ${detail.platformSplit.xinyang}</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="staff-kpi-grid">
            <div class="staff-kpi-card success">
                <div class="label">有效率</div>
                <div class="value">${detail.performance.有效率}</div>
                <div class="sub">目标 45%</div>
            </div>
            <div class="staff-kpi-card ${parseFloat(detail.performance.平均首响) > 8 ? 'danger' : parseFloat(detail.performance.平均首响) > 5 ? 'warning' : 'success'}">
                <div class="label">平均首响</div>
                <div class="value">${detail.performance.平均首响}</div>
                <div class="sub">标准 ≤5分钟</div>
            </div>
            <div class="staff-kpi-card">
                <div class="label">预约率</div>
                <div class="value">${detail.performance.预约率}</div>
                <div class="sub">目标 48%</div>
            </div>
            <div class="staff-kpi-card">
                <div class="label">到院率</div>
                <div class="value">${detail.performance.到院率}</div>
                <div class="sub">目标 55%</div>
            </div>
        </div>

        <div class="staff-section-title">📈 转化漏斗分析</div>
        <div class="conversion-flow">
            ${detail.conversionDetail.map((item, idx) => `
                ${idx > 0 ? '<div class="conversion-arrow">→</div>' : ''}
                <div class="conversion-node ${statusClass[item.status]}">
                    <div class="stage">${item.stage}</div>
                    <div class="rate">${item.rate}</div>
                    <div class="benchmark">均值 ${item.benchmark}</div>
                    <span class="status-tag">${item.status}</span>
                </div>
            `).join('')}
        </div>

        ${detail.responseTimeout.total > 0 ? `
        <div class="staff-section-title">⏱ 首响超时记录 (${detail.responseTimeout.total}次)</div>
        <div class="timeout-list">
            ${detail.responseTimeout.detail.length > 0 ? detail.responseTimeout.detail.map(item => `
                <div class="timeout-item">
                    <span class="time">${item.time}</span>
                    <span>${item.project}</span>
                    <span class="delay">${item.delay}</span>
                    <span>${item.reason}</span>
                </div>
            `).join('') : '<p style="color:#8ba3c7;font-size:12px;padding:10px;">暂无详细记录，建议关注系统通知设置</p>'}
        </div>
        ` : ''}

        <div class="staff-section-title">📋 最近跟进线索</div>
        <div class="staff-recent-leads">
            ${detail.recentLeads.map(lead => `
                <div class="recent-lead-item">
                    <span>${lead.date}</span>
                    <span style="color:#e6f0ff;">${lead.name} - ${lead.project}</span>
                    <span>${lead.budget}</span>
                    <span class="status-${lead.status === '已成交' ? 'deal' : lead.status === '待到院' ? 'wait' : lead.status === '流失' ? 'lost' : 'ing'}">${lead.status}</span>
                    <span></span>
                </div>
            `).join('')}
        </div>

        <div class="staff-section-title">💬 复盘点评</div>
        <div class="feedback-list">
            ${detail.feedback.map(fb => `<div class="feedback-item">${fb}</div>`).join('')}
        </div>
    `;

    modal.classList.add('active');
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
                <td style="color:#e6f0ff;cursor:pointer;" class="btn-clickable" onclick="handleAlert('view', '${item.name}')">${item.name}</td>
                <td>${item.project}</td>
                <td class="${b.class}">${b.label}</td>
                <td style="max-width:240px;">${item.desc}</td>
                <td style="cursor:pointer;" class="btn-clickable" onclick="openStaffDetail('${item.staff === '无人' || item.staff === '多客服' || item.staff === '待分配' || item.staff.indexOf('/') > 0 ? '李XX' : item.staff}')">${item.staff}</td>
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
    if (action === 'view') {
        showToast(`查看 ${name} 的详细资料`);
        return;
    }
    const actions = { assign: '已重新分配', recover: '已发起追回流程', ignore: '已标记忽略' };
    showToast(`${name}: ${actions[action]}`, action === 'recover' ? 'success' : '');
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
    currentDrillType = type;
    const dataTypeMap = {
        nightMiss: 'night',
        timeout: 'timeout',
        highValue: 'highValue',
        firstResponse: 'firstResponse',
        staff: 'staff',
        funnel: 'funnel'
    };
    const alertType = dataTypeMap[type];

    if (alertType === 'night' || alertType === 'timeout' || alertType === 'highValue') {
        renderAlertDrillModal(type, alertType);
    } else {
        renderStandardDrillModal(type);
    }
}

function renderAlertDrillModal(type, alertType) {
    const modal = document.getElementById('drillModal');
    const container = document.querySelector('.modal-container');
    container.classList.add('large');

    const titleMap = {
        nightMiss: '🌙 夜间漏接线索',
        timeout: '⏱ 超时未跟进线索',
        highValue: '💰 高预算客户流失'
    };
    const summaryMap = {
        nightMiss: [
            { num: 23, label: '漏接总数', color: '#ff4d4f' },
            { num: 8, label: '高意向客户', color: '#722ed1' },
            { num: 6, label: '高预算(≥5万)', color: '#722ed1' },
            { num: '2.5h', label: '平均漏接时长', color: '#faad14' }
        ],
        timeout: [
            { num: 86, label: '超时总数', color: '#fa8c16' },
            { num: 42, label: '超过48小时', color: '#ff4d4f' },
            { num: 35, label: '高预算客户', color: '#722ed1' },
            { num: '38h', label: '平均超时', color: '#faad14' }
        ],
        highValue: [
            { num: 12, label: '流失人数', color: '#ff4d4f' },
            { num: '98万', label: '预估损失', color: '#ff4d4f' },
            { num: 7, label: '流失于咨询环节', color: '#faad14' },
            { num: 5, label: '流失于到院环节', color: '#fa8c16' }
        ]
    };

    const leads = mockData.alertLeadsDetail[alertType] || [];

    document.getElementById('modalTitle').textContent = `${titleMap[type]} - 支持筛选与追回`;

    const summary = summaryMap[type] || [];

    document.getElementById('modalBody').innerHTML = `
        <div class="drill-detail-header">
            ${summary.map(s => `
                <div class="drill-stat-card">
                    <div class="num" style="color:${s.color};">${s.num}</div>
                    <div class="label">${s.label}</div>
                </div>
            `).join('')}
        </div>

        <div class="drill-filters">
            <div class="filter-item">
                <label>平台筛选</label>
                <select id="filterPlatform" onchange="applyDrillFilters()">
                    <option value="all">全部平台</option>
                    <option value="meituan">美团</option>
                    <option value="xinyang">新氧</option>
                </select>
            </div>
            <div class="filter-item">
                <label>项目类型</label>
                <select id="filterProject" onchange="applyDrillFilters()">
                    <option value="all">全部项目</option>
                    <option value="抗衰">抗衰类</option>
                    <option value="皮肤">皮肤类</option>
                    <option value="整形">整形类</option>
                    <option value="注射">注射类</option>
                    <option value="口腔">口腔类</option>
                </select>
            </div>
            <div class="filter-item">
                <label>预算区间</label>
                <select id="filterBudget" onchange="applyDrillFilters()">
                    <option value="all">全部预算</option>
                    <option value="high">高预算 (5万+)</option>
                    <option value="mid">中预算 (1-5万)</option>
                    <option value="low">低预算 (1万内)</option>
                </select>
            </div>
            <div class="filter-item">
                <label>优先级</label>
                <select id="filterPriority" onchange="applyDrillFilters()">
                    <option value="all">全部</option>
                    <option value="高">高优先级</option>
                    <option value="中">中优先级</option>
                    <option value="低">低优先级</option>
                </select>
            </div>
        </div>

        <div class="drill-batch-actions">
            <button class="btn-batch" onclick="batchAddToRecover()">➕ 批量加入今日追回清单</button>
            <button class="btn-mini" onclick="clearDrillFilters()">清除筛选</button>
            <span class="selected-count" id="selectedCount">已选择 0 条</span>
        </div>

        <div class="alert-table-wrapper" style="max-height:400px;">
            <table class="alert-table" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:40px;"><input type="checkbox" id="checkAllDrill" onchange="toggleAllDrill(this)"></th>
                        <th>优先级</th>
                        <th>客户</th>
                        <th>电话</th>
                        <th>平台</th>
                        <th>意向项目</th>
                        <th>预算</th>
                        <th>问题描述</th>
                        <th>当前状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="drillTableBody">
                    ${renderDrillTableRows(leads)}
                </tbody>
            </table>
        </div>
    `;

    modal.classList.add('active');
    updateSelectedCount();
}

function renderDrillTableRows(leads) {
    const typeMap = { night: '夜间漏接', timeout: '超时未跟进', highValue: '高值流失' };
    return leads.map(lead => {
        const isInRecover = state.recoverList.some(r => r.id === lead.id);
        return `
            <tr>
                <td><input type="checkbox" class="drill-checkbox" data-id="${lead.id}" ${isInRecover ? 'disabled checked' : ''} onchange="updateSelectedCount()"></td>
                <td><span class="priority-${lead.priority.toLowerCase()}">${lead.priority}优先级</span></td>
                <td style="color:#e6f0ff;">${lead.name}</td>
                <td style="color:#8ba3c7;">${lead.phone}</td>
                <td><span class="tag ${lead.platform === 'meituan' ? 'mt' : 'xy'}">${lead.platform === 'meituan' ? '美团' : '新氧'}</span></td>
                <td>${lead.project}</td>
                <td class="budget-${lead.budget}">${lead.budgetText}</td>
                <td style="max-width:200px;font-size:12px;">${lead.desc}</td>
                <td>${lead.status}</td>
                <td>
                    <button class="btn-add-recover ${isInRecover ? 'added' : ''}" data-id="${lead.id}" onclick="addToRecoverList('${lead.id}')" ${isInRecover ? 'disabled' : ''}>
                        ${isInRecover ? '✓ 已加入' : '+ 加入追回'}
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function applyDrillFilters() {
    const platform = document.getElementById('filterPlatform').value;
    const project = document.getElementById('filterProject').value;
    const budget = document.getElementById('filterBudget').value;
    const priority = document.getElementById('filterPriority').value;

    currentDrillFilters = { platform, project, budget, priority };

    const alertTypeMap = { nightMiss: 'night', timeout: 'timeout', highValue: 'highValue' };
    const alertType = alertTypeMap[currentDrillType];
    let leads = mockData.alertLeadsDetail[alertType] || [];

    if (platform !== 'all') {
        leads = leads.filter(l => l.platform === platform);
    }
    if (budget !== 'all') {
        leads = leads.filter(l => l.budget === budget);
    }
    if (priority !== 'all') {
        leads = leads.filter(l => l.priority === priority);
    }
    if (project !== 'all') {
        const keywords = {
            '抗衰': ['热玛吉', 'Fotona', '拉皮', '抗衰'],
            '皮肤': ['皮秒', '光子', '水光', '祛斑', '皮肤'],
            '整形': ['鼻综合', '眼综合', '肋骨', '颌面', '整形', '隆胸', '吸脂'],
            '注射': ['玻尿酸', '瘦脸', '注射', '填充'],
            '口腔': ['种植', '牙', '口腔']
        };
        leads = leads.filter(l => {
            return keywords[project].some(kw => l.project.indexOf(kw) >= 0);
        });
    }

    document.getElementById('drillTableBody').innerHTML = renderDrillTableRows(leads);
    updateSelectedCount();
}

function clearDrillFilters() {
    document.getElementById('filterPlatform').value = 'all';
    document.getElementById('filterProject').value = 'all';
    document.getElementById('filterBudget').value = 'all';
    document.getElementById('filterPriority').value = 'all';
    applyDrillFilters();
}

function toggleAllDrill(checkbox) {
    document.querySelectorAll('.drill-checkbox:not(:disabled)').forEach(cb => {
        cb.checked = checkbox.checked;
    });
    updateSelectedCount();
}

function updateSelectedCount() {
    const count = document.querySelectorAll('.drill-checkbox:checked:not(:disabled)').length;
    const el = document.getElementById('selectedCount');
    if (el) el.textContent = `已选择 ${count} 条`;
}

function batchAddToRecover() {
    const checked = document.querySelectorAll('.drill-checkbox:checked:not(:disabled)');
    if (checked.length === 0) {
        showToast('请先选择要加入的线索', 'error');
        return;
    }

    const alertTypeMap = { nightMiss: 'night', timeout: 'timeout', highValue: 'highValue' };
    const alertType = alertTypeMap[currentDrillType];
    const allLeads = mockData.alertLeadsDetail[alertType] || [];
    let added = 0;

    checked.forEach(cb => {
        const id = cb.dataset.id;
        const lead = allLeads.find(l => l.id === id);
        if (lead && !state.recoverList.some(r => r.id === id)) {
            const typeMap = { night: '夜间漏接', timeout: '超时未跟进', highValue: '高值流失' };
            state.recoverList.push({
                ...lead,
                alertType: typeMap[alertType],
                recoverSuggest: lead.recoverSuggest || '立即电话回访，了解客户真实顾虑，提供专属优惠'
            });
            added++;
        }
    });

    showToast(`成功添加 ${added} 条线索到今日追回清单`, 'success');
    updateRecoverListUI();
    applyDrillFilters();
}

function addToRecoverList(id) {
    const alertTypeMap = { nightMiss: 'night', timeout: 'timeout', highValue: 'highValue' };
    const alertType = alertTypeMap[currentDrillType];
    const allLeads = mockData.alertLeadsDetail[alertType] || [];
    const lead = allLeads.find(l => l.id === id);

    if (!lead) return;
    if (state.recoverList.some(r => r.id === id)) {
        showToast('该线索已在追回清单中', 'error');
        return;
    }

    const typeMap = { night: '夜间漏接', timeout: '超时未跟进', highValue: '高值流失' };
    state.recoverList.push({
        ...lead,
        alertType: typeMap[alertType],
        recoverSuggest: lead.recoverSuggest || '立即电话回访，了解客户真实顾虑，提供专属优惠'
    });

    showToast(`已将 ${lead.name} 加入今日追回清单`, 'success');
    updateRecoverListUI();
    applyDrillFilters();
}

function renderStandardDrillModal(type) {
    const container = document.querySelector('.modal-container');
    container.classList.remove('large');
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
                        ${row.map((cell, idx) => {
                            const isStaff = config.columns[idx] === '客服';
                            const displayText = typeof cell === 'string' && cell.indexOf('待培训') > 0 ? '<span style="color:#ff4d4f;">' + cell + '</span>' : cell;
                            const staffName = typeof cell === 'string' ? cell.replace(/[^张王李赵刘陈周吴]/g, '').substring(0, 2) : '';
                            return `<td style="padding:12px;border-bottom:1px solid rgba(64,158,255,0.05);color:#8ba3c7;font-size:13px;${isStaff ? 'cursor:pointer;' : ''}" ${isStaff && staffName ? `onclick="openStaffDetail('${staffName}')"` : ''}>${displayText}</td>`;
                        }).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('modalBody').innerHTML = summaryHtml + tableHtml;
    document.getElementById('drillModal').classList.add('active');
}

function updateRecoverListUI() {
    const countEl = document.getElementById('recoverCount');
    const emptyEl = document.getElementById('recoverEmpty');
    const wrapperEl = document.getElementById('recoverTableWrapper');
    const tbody = document.getElementById('recoverTableBody');

    if (countEl) countEl.textContent = state.recoverList.length;

    if (state.recoverList.length === 0) {
        if (emptyEl) emptyEl.style.display = 'block';
        if (wrapperEl) wrapperEl.style.display = 'none';
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (wrapperEl) wrapperEl.style.display = 'block';

    tbody.innerHTML = state.recoverList.map(lead => `
        <tr>
            <td><input type="checkbox" class="recover-checkbox" data-id="${lead.id}"></td>
            <td><span class="priority-${lead.priority.toLowerCase()}">${lead.priority}</span></td>
            <td><span class="alert-type-tag alert-type-${lead.alertType === '夜间漏接' ? 'night' : lead.alertType === '超时未跟进' ? 'timeout' : 'high'}">${lead.alertType}</span></td>
            <td style="color:#e6f0ff;">${lead.name}</td>
            <td>${lead.project}</td>
            <td class="budget-${lead.budget}">${lead.budgetText}</td>
            <td><span class="tag ${lead.platform === 'meituan' ? 'mt' : 'xy'}">${lead.platform === 'meituan' ? '美团' : '新氧'}</span></td>
            <td>${lead.staff}</td>
            <td style="max-width:200px;font-size:11px;">${lead.desc}</td>
            <td style="max-width:180px;font-size:11px;color:#36cfc9;">${lead.recoverSuggest}</td>
            <td>
                <div class="action-btn-row">
                    <button class="btn-mini" onclick="markRecovered('${lead.id}')">✓ 已追回</button>
                    <button class="btn-mini danger" onclick="removeFromRecover('${lead.id}')">移除</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function toggleAllRecover(checkbox) {
    document.querySelectorAll('.recover-checkbox').forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

function markRecovered(id) {
    const lead = state.recoverList.find(r => r.id === id);
    if (lead) {
        showToast(`🎉 ${lead.name} 已标记为成功追回！`, 'success');
        removeFromRecover(id);
    }
}

function removeFromRecover(id) {
    state.recoverList = state.recoverList.filter(r => r.id !== id);
    updateRecoverListUI();
    showToast('已从追回清单移除');
}

function clearRecoverList() {
    if (state.recoverList.length === 0) {
        showToast('清单已为空', 'error');
        return;
    }
    if (confirm('确定要清空今日追回清单吗？')) {
        state.recoverList = [];
        updateRecoverListUI();
        showToast('已清空追回清单');
    }
}

function exportRecoverList() {
    if (state.recoverList.length === 0) {
        showToast('追回清单为空，无可导出内容', 'error');
        return;
    }

    const headers = ['优先级', '异常类型', '客户姓名', '电话', '平台', '意向项目', '预算区间', '问题描述', '分配客服', '发生时间', '追回建议'];
    const rows = state.recoverList.map(lead => [
        lead.priority,
        lead.alertType,
        lead.name,
        lead.phone,
        lead.platform === 'meituan' ? '美团' : '新氧',
        lead.project,
        lead.budgetText,
        lead.desc,
        lead.staff,
        lead.time,
        lead.recoverSuggest
    ]);

    downloadCSV(headers, rows, `今日追回清单_${formatDate(new Date())}.csv`);
}

function exportData(type) {
    if (type === 'all') {
        const data = mockData.exportData.allLeads;
        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(h => item[h]));
        downloadCSV(headers, rows, `医美线索经营数据_全部_${formatDate(new Date())}.csv`);
    } else if (type === 'ad') {
        const data = mockData.exportData.adAdjustment;
        const headers = Object.keys(data[0]);
        const rows = data.map(item => headers.map(h => item[h]));
        downloadCSV(headers, rows, `投放调整建议_${formatDate(new Date())}.csv`);
    }
}

function downloadCSV(headers, rows, filename) {
    const bom = '\uFEFF';
    const headerLine = headers.map(h => `"${h}"`).join(',');
    const contentLines = rows.map(row =>
        row.map(cell => {
            const text = cell === null || cell === undefined ? '' : String(cell);
            return `"${text.replace(/"/g, '""')}"`;
        }).join(',')
    );
    const csvContent = bom + headerLine + '\n' + contentLines.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`✅ 已导出「${filename}」`, 'success');
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

function generateReport() {
    showToast('正在生成每日复盘报告，请稍候...');
    setTimeout(() => {
        const headers = ['模块', '指标', '今日值', '目标值', '状态', '负责人', '今日动作'];
        const rows = [
            ['投放概览', '线索总量', '1286', '1000', '✅ 达标', '运营部', '维持现有投放节奏'],
            ['投放概览', '接通率', '78.3%', '80%', '❌ 未达标', '客服组', '优化排班，加强夜间值班'],
            ['投放概览', '首响时长', '6.8分钟', '≤5分钟', '❌ 未达标', '客服组', '新氧渠道首响流程优化'],
            ['项目漏斗', '皮肤项目预约率', '37%', '45%', '❌ 未达标', '咨询组', '14:00咨询话术培训'],
            ['项目漏斗', '整形外科到院率', '71.2%', '65%', '✅ 达标', '咨询组', '保持优秀经验分享'],
            ['客服绩效', '张XX有效率', '62%', '45%', '✅ 优秀', '张XX', '标杆经验分享'],
            ['客服绩效', '李XX有效率', '28%', '45%', '❌ 严重偏低', '李XX', '今日开始导师带教'],
            ['异常预警', '夜间漏接', '23条', '0', '❌ 异常', '值班组', '高优先级追回8条高意向'],
            ['异常预警', '高值流失', '12人', '≤3', '❌ 异常', '咨询组', '今日内全部二次回访']
        ];
        downloadCSV(headers, rows, `晨会复盘报告_${formatDate(new Date())}.csv`);
    }, 800);
}

function showToast(msg, type = '') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
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
        white-space: nowrap;
        max-width: 90vw;
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

function closeModal() {
    document.getElementById('drillModal').classList.remove('active');
    document.querySelector('.modal-container').classList.remove('large');
}

document.getElementById('drillModal').addEventListener('click', (e) => {
    if (e.target.id === 'drillModal') closeModal();
});

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
    updateRecoverListUI();

    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-20px); } }
    `;
    document.head.appendChild(style);
});
