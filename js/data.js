const mockData = {
    kpiData: {
        all: {
            leads: 1286,
            connectRate: 78.3,
            responseTime: 6.8,
            bookRate: 35.6,
            arriveRate: 62.4,
            roi: 3.8
        },
        meituan: {
            leads: 782,
            connectRate: 82.1,
            responseTime: 4.2,
            bookRate: 38.9,
            arriveRate: 65.8,
            roi: 4.2
        },
        xinyang: {
            leads: 504,
            connectRate: 72.4,
            responseTime: 10.8,
            bookRate: 30.5,
            arriveRate: 57.1,
            roi: 3.1
        }
    },
    channelData: {
        dimensions: ['线索量', '接通率(%)', '首响(分钟)', '预约率(%)', '到院率(%)', '客单价(万)'],
        meituan: [782, 82.1, 4.2, 38.9, 65.8, 1.8],
        xinyang: [504, 72.4, 10.8, 30.5, 57.1, 2.5]
    },
    storeData: {
        byStore: {
            names: ['朝阳旗舰店', '海淀分院', '国贸店', '望京店', '西单店'],
            booked: [128, 96, 85, 72, 64],
            arrived: [96, 46, 58, 52, 42],
            closed: [56, 24, 35, 30, 25]
        },
        byDoctor: {
            names: ['王XX（外科）', '李XX（皮肤）', '张XX（口腔）', '赵XX（注射）', '陈XX（鼻修复）', '刘XX（眼整形）'],
            booked: [68, 85, 52, 78, 45, 38],
            arrived: [52, 56, 38, 60, 35, 28],
            closed: [32, 28, 22, 42, 22, 18]
        }
    },
    funnelData: {
        all: [
            { value: 1286, name: '曝光点击' },
            { value: 1006, name: '有效咨询' },
            { value: 458, name: '成功预约' },
            { value: 286, name: '实际到院' },
            { value: 165, name: '完成成交' }
        ],
        skin: [
            { value: 456, name: '曝光点击' },
            { value: 342, name: '有效咨询' },
            { value: 128, name: '成功预约' },
            { value: 72, name: '实际到院' },
            { value: 38, name: '完成成交' }
        ],
        dental: [
            { value: 248, name: '曝光点击' },
            { value: 196, name: '有效咨询' },
            { value: 108, name: '成功预约' },
            { value: 78, name: '实际到院' },
            { value: 52, name: '完成成交' }
        ],
        light: [
            { value: 358, name: '曝光点击' },
            { value: 295, name: '有效咨询' },
            { value: 142, name: '成功预约' },
            { value: 102, name: '实际到院' },
            { value: 55, name: '完成成交' }
        ],
        surgery: [
            { value: 224, name: '曝光点击' },
            { value: 173, name: '有效咨询' },
            { value: 80, name: '成功预约' },
            { value: 34, name: '实际到院' },
            { value: 20, name: '完成成交' }
        ]
    },
    staffData: {
        names: ['张XX', '王XX', '陈XX', '刘XX', '赵XX', '李XX', '周XX', '吴XX'],
        received: [268, 245, 228, 196, 182, 165, 142, 128],
        validRate: [62, 58, 55, 52, 48, 28, 45, 42],
        responseTime: [2.3, 3.5, 4.2, 5.1, 6.8, 12.5, 5.6, 6.2]
    },
    cycleData: {
        days: ['1天内', '1-3天', '3-7天', '7-15天', '15-30天', '30天以上'],
        values: [28, 56, 42, 25, 12, 8],
        categoryMap: {
            skin: [15, 32, 22, 12, 6, 3],
            light: [8, 18, 15, 9, 4, 2],
            surgery: [2, 5, 8, 10, 8, 5]
        }
    },
    alertList: [
        { type: 'night', platform: 'meituan', name: '张女士', project: '热玛吉抗衰', budget: 'high', desc: '23:42提交咨询，未被接通，已等待8小时', staff: '李XX', time: '2026-06-22 23:42' },
        { type: 'timeout', platform: 'xinyang', name: '王女士', project: '鼻综合修复', budget: 'high', desc: '咨询后48小时未跟进，客户未回复', staff: '周XX', time: '2026-06-20 14:25' },
        { type: 'repeat', platform: 'meituan', name: '刘先生', project: '种植牙', budget: 'mid', desc: '同一客户被分配给3个客服，造成混乱', staff: '多客服', time: '2026-06-22 10:15' },
        { type: 'highValue', platform: 'xinyang', name: '陈女士', project: '全身吸脂+丰胸', budget: 'high', desc: '预算12万，咨询后在比价环节流失', staff: '赵XX', time: '2026-06-21 16:30' },
        { type: 'night', platform: 'xinyang', name: '赵女士', project: '眼综合', budget: 'mid', desc: '01:15私信咨询，次日10点才回复', staff: '吴XX', time: '2026-06-22 01:15' },
        { type: 'timeout', platform: 'meituan', name: '孙女士', project: '皮秒祛斑', budget: 'low', desc: '首次接触后72小时内无二次跟进', staff: '李XX', time: '2026-06-19 09:45' },
        { type: 'repeat', platform: 'xinyang', name: '周先生', project: '发际线种植', budget: 'mid', desc: '美团和新氧双渠道进线，重复跟进', staff: '王XX/张XX', time: '2026-06-22 08:50' },
        { type: 'highValue', platform: 'meituan', name: '吴女士', project: '拉皮手术', budget: 'high', desc: '到院后因价格犹豫，未及时回访流失', staff: '陈XX', time: '2026-06-20 15:20' },
        { type: 'night', platform: 'meituan', name: '郑女士', project: '玻尿酸填充', budget: 'mid', desc: '22:58留资，夜间值班人员漏接', staff: '无人', time: '2026-06-21 22:58' },
        { type: 'timeout', platform: 'meituan', name: '冯女士', project: '瘦脸针+下颌缘', budget: 'mid', desc: '预约确认后24小时未再次提醒', staff: '刘XX', time: '2026-06-21 11:30' },
        { type: 'night', platform: 'xinyang', name: '何女士', project: '假体隆胸', budget: 'high', desc: '凌晨2:30咨询，次日11点回复已失效', staff: '无人', time: '2026-06-22 02:30' },
        { type: 'highValue', platform: 'xinyang', name: '韩女士', project: '肋骨鼻修复', budget: 'high', desc: '对比3家后选竞品，流失原因未记录', staff: '赵XX', time: '2026-06-19 14:10' },
        { type: 'repeat', platform: 'meituan', name: '许女士', project: '水光针套餐', budget: 'low', desc: '3天内重复进线5次，未识别老客', staff: '多客服', time: '2026-06-22 09:15' },
        { type: 'timeout', platform: 'xinyang', name: '邓女士', project: '私密整形', budget: 'high', desc: '敏感项目，跟进不及时导致流失', staff: '周XX', time: '2026-06-20 18:45' },
        { type: 'night', platform: 'meituan', name: '傅女士', project: 'Fotona 4D', budget: 'high', desc: '23:15咨询含多项目，高意向漏接', staff: '无人', time: '2026-06-21 23:15' }
    ],
    drillData: {
        nightMiss: {
            title: '夜间漏接线索详情',
            summary: [
                { num: 23, label: '漏接总数', color: '#ff4d4f' },
                { num: 8, label: '高意向客户', color: '#722ed1' },
                { num: 6, label: '高预算(≥5万)', color: '#722ed1' },
                { num: '2.5h', label: '平均漏接时长', color: '#faad14' }
            ],
            columns: ['时间', '客户', '平台', '意向项目', '预算', '跟进客服', '状态'],
            rows: [
                ['23:42', '张女士', '美团', '热玛吉抗衰', '10万+', '待分配', '未处理'],
                ['23:15', '傅女士', '美团', 'Fotona 4D', '8万+', '待分配', '未处理'],
                ['22:58', '郑女士', '美团', '玻尿酸填充', '2-5万', '待分配', '未处理'],
                ['02:30', '何女士', '新氧', '假体隆胸', '8万+', '待分配', '已超时'],
                ['01:15', '赵女士', '新氧', '眼综合', '2-5万', '吴XX', '已跟进(延迟)'],
                ['00:28', '吕女士', '美团', '光子嫩肤', '5千-1万', '待分配', '未处理'],
                ['23:55', '施女士', '新氧', '鼻综合', '5-10万', '待分配', '未处理']
            ]
        },
        firstResponse: {
            title: '首响时长超标详情',
            summary: [
                { num: '42%', label: '超标占比', color: '#ff4d4f' },
                { num: '18min', label: '新氧平均', color: '#fa8c16' },
                { num: '4.2min', label: '美团平均', color: '#52c41a' },
                { num: '5min', label: '标准阈值', color: '#8ba3c7' }
            ],
            columns: ['客服', '平台', '接待量', '平均首响', '超标次数', '超标率', '状态'],
            rows: [
                ['李XX', '新氧', 86, '12.5分钟', 42, '48.8%', '需培训'],
                ['周XX', '新氧', 78, '8.6分钟', 28, '35.9%', '需关注'],
                ['吴XX', '新氧', 62, '7.2分钟', 18, '29.0%', '正常'],
                ['张XX', '美团', 168, '2.3分钟', 5, '3.0%', '优秀'],
                ['王XX', '美团', 145, '3.5分钟', 8, '5.5%', '良好'],
                ['陈XX', '美团', 128, '4.2分钟', 12, '9.4%', '正常']
            ]
        },
        staff: {
            title: '客服绩效异常详情',
            summary: [
                { num: '28%', label: '李XX有效率', color: '#ff4d4f' },
                { num: '45%', label: '团队均值', color: '#8ba3c7' },
                { num: '62%', label: '标杆值', color: '#52c41a' },
                { num: '-17%', label: '差距', color: '#ff4d4f' }
            ],
            columns: ['客服', '接待量', '有效量', '有效率', '预约量', '预约率', '评级'],
            rows: [
                ['张XX', 268, 166, '62.0%', 98, '59.0%', '⭐⭐⭐'],
                ['王XX', 245, 142, '58.0%', 82, '57.7%', '⭐⭐⭐'],
                ['陈XX', 228, 125, '54.8%', 68, '54.4%', '⭐⭐'],
                ['刘XX', 196, 102, '52.0%', 55, '53.9%', '⭐⭐'],
                ['赵XX', 182, 87, '47.8%', 42, '48.3%', '⭐⭐'],
                ['周XX', 142, 64, '45.1%', 28, '43.8%', '⭐'],
                ['吴XX', 128, 54, '42.2%', 22, '40.7%', '⭐'],
                ['李XX', 165, 46, '27.9%', 15, '32.6%', '⚠待培训']
            ]
        },
        highValue: {
            title: '高预算客户流失分析',
            summary: [
                { num: 12, label: '流失人数', color: '#ff4d4f' },
                { num: '98万', label: '预估损失', color: '#ff4d4f' },
                { num: 7, label: '流失于咨询环节', color: '#faad14' },
                { num: 5, label: '流失于到院环节', color: '#fa8c16' }
            ],
            columns: ['客户', '意向项目', '预算', '流失环节', '流失原因', '跟进客服', '追回建议'],
            rows: [
                ['陈女士', '全身吸脂+丰胸', '12万', '咨询→成交', '比价竞品', '赵XX', '院长出面+分期方案'],
                ['吴女士', '拉皮手术', '8万', '到院→成交', '价格犹豫', '陈XX', '赠送护理包+VIP服务'],
                ['韩女士', '肋骨鼻修复', '10万', '咨询→预约', '担心效果', '赵XX', '案例参观+医生面诊'],
                ['邓女士', '私密整形', '6万', '咨询→跟进', '隐私顾虑', '周XX', '女医生专属通道'],
                ['沈女士', '颌面整形', '15万', '预约→到院', '时间冲突', '王XX', '灵活档期+专车接送']
            ]
        },
        funnel: {
            title: '皮肤项目漏斗流失分析',
            summary: [
                { num: '68%', label: '总流失率', color: '#ff4d4f' },
                { num: '41%', label: '咨询→预约流失', color: '#ff4d4f' },
                { num: '28%', label: '预约→到院流失', color: '#faad14' },
                { num: '47%', label: '到院→成交率', color: '#52c41a' }
            ],
            columns: ['流失环节', '流失人数', '占比', '主要原因', 'TOP话术问题', '优化建议'],
            rows: [
                ['咨询→预约', 214, '41%', '价格敏感/效果疑虑', '报价过早，案例展示不足', '先建立信任再报价'],
                ['预约→到院', 56, '28%', '时间变动/竞品诱惑', '预约后无再次确认', '三重提醒+到院激励'],
                ['到院→成交', 34, '53%', '方案不匹配/医生排期', '方案讲解过于专业', '可视化方案+灵活分期']
            ]
        }
    }
};
