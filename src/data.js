export const allDashboardData = {
    'CSPM Executive Dashboard' : {
        maindata:  [
            {
                id: 1,
                'sub_title': 'Cloud Accounts',
                'chart_type': 'pie',
                'data': [
                    { name: 'Connected', value: 2, color: '#8884d8' },
                    { name: 'Not Connected', value: 2, color: '#d8d8d8' },
                ],
                'parent_category': 'CSPM Executive Dashboard',
                'available': true
            },
            {
                id: 2,
                'sub_title': 'Cloud Account Risk Assesment',
                'chart_type': 'pie',
                'data': [
                    { name: 'Failed', value: 1689, color: '#FF0000' },
                    { name: 'Warning', value: 681, color: '#FFD700' },
                    { name: 'Not available', value: 36, color: '#CCCCCC' },
                    { name: 'Passed', value: 7253, color: '#008000' },
                ],
                'parent_category': 'CSPM Executive Dashboard',
                'available': true
            },
            {
                id: 22,
                'sub_title': 'test',
                'chart_type': 'pie',
                'data': [
                    { name: 'Failed', value: 689, color: '#FF0000' },
                    { name: 'Warning', value: 61, color: '#FFD700' },
                    { name: 'Not available', value: 36, color: '#CCCCCC' },
                    { name: 'Passed', value: 53, color: '#008000' },
                ],
                'parent_category': 'CSPM Executive Dashboard',
                'available': false
            }
        ],
        alias: 'CSPM Executive Dashboard'
    },
    'CWPP DASHBOARD' : {
        maindata:  [
            {
                id: 3,
                'sub_title': 'Top 5 Namespace Specific Alerts',
                'chart_type': 'pie',
                data: [],
                'parent_category': 'CWPP DASHBOARD',
                'available': true
            },
            {
                id: 4,
                'sub_title': 'Workload Alerts',
                'chart_type': 'pie',
                data: [],
                'parent_category': 'CWPP DASHBOARD',
                'available': true
            },
            {
                id: 41,
                'sub_title': 'Workload Alerts3',
                'chart_type': 'pie',
                data: [],
                'parent_category': 'CWPP DASHBOARD',
                'available': false
            },
        ]
    },
    'Registry Scan': {
        maindata : [
            {
                id: 5,
                'sub_title': 'Image Risk Assessment',
                'sub_info': 'vulnerability',
                'chart_type': 'progress',
                'parent_category': 'Registry Scan',
                'available': true,
                data: [
                    { name: 'Critical', value: 9, color: '#d32f2f' }, // Red
                    { name: 'High', value: 50, color: '#f57c00' }, // Orange
                    { name: 'Medium', value: 30, color: '#ffca28' }, // Yellow
                    { name: 'Low', value: 10, color: '#bdbdbd' }, // Grey
                ]  
            },
            {
                id: 6,
                'sub_title': 'Image Security Issue',
                'sub_info': 'Images',
                'chart_type': 'progress',
                'parent_category': 'Registry Scan',
                'available': true,
                data: [
                    { name: 'Critical', value: 19, color: '#d32f2f' }, // Red
                    { name: 'High', value: 15, color: '#f57c00' }, // Orange
                    { name: 'Medium', value: 40, color: '#ffca28' }, // Yellow
                    { name: 'Low', value: 11, color: '#bdbdbd' }, // Grey
                ]  
            },
            {
                id: 61,
                'sub_title': 'Image Security Issue2',
                'sub_info': 'Images',
                'chart_type': 'progress',
                'parent_category': 'Registry Scan',
                'available': false,
                data: [
                    { name: 'Critical', value: 9, color: '#d32f2f' }, // Red
                    { name: 'High', value: 11, color: '#f57c00' }, // Orange
                    { name: 'Medium', value: 30, color: '#ffca28' }, // Yellow
                    { name: 'Low', value: 21, color: '#bdbdbd' }, // Grey
                ]  
            }
        ]
    }
}