export const sailMines = [
    {
        id: 'gua-main',
        name: 'Gua Main Mine',
        location: 'Gua, Jharkhand',
        type: 'Iron Ore',
        complianceScore: 96,
        status: 'excellent',
        documents: {
            EC: { score: 98, status: 'Active', dueDate: '2025-06-15' },
            CTE: { score: 95, status: 'Active', dueDate: '2025-03-20' },
            CTO: { score: 97, status: 'Active', dueDate: '2025-08-10' },
            FC: { score: 94, status: 'Active', dueDate: '2025-12-05' }
        },
        departments: { environmental: 98, safety: 94, operations: 96, legal: 95 }
    },
    {
        id: 'gua-west',
        name: 'Gua West Mine',
        location: 'Gua, Jharkhand',
        type: 'Iron Ore',
        complianceScore: 92,
        status: 'good',
        documents: {
            EC: { score: 94, status: 'Active', dueDate: '2025-04-12' },
            CTE: { score: 91, status: 'Active', dueDate: '2025-07-18' },
            CTO: { score: 93, status: 'Active', dueDate: '2025-05-25' },
            FC: { score: 90, status: 'Renewal Due', dueDate: '2024-01-30' }
        },
        departments: { environmental: 93, safety: 91, operations: 92, legal: 91 }
    },
    {
        id: 'gua-east',
        name: 'Gua East Mine',
        location: 'Gua, Jharkhand',
        type: 'Iron Ore',
        complianceScore: 84,
        status: 'warning',
        documents: {
            EC: { score: 87, status: 'Under Review', dueDate: '2024-01-25' },
            CTE: { score: 85, status: 'Active', dueDate: '2025-09-08' },
            CTO: { score: 82, status: 'Action Required', dueDate: '2024-01-20' },
            FC: { score: 81, status: 'Pending', dueDate: '2024-02-15' }
        },
        departments: { environmental: 82, safety: 85, operations: 84, legal: 86 }
    },
    {
        id: 'rourkela-coal',
        name: 'Rourkela Coal Mine',
        location: 'Rourkela, Odisha',
        type: 'Coal',
        complianceScore: 88,
        status: 'good',
        documents: {
            EC: { score: 90, status: 'Active', dueDate: '2025-11-30' },
            CTE: { score: 87, status: 'Active', dueDate: '2025-02-14' },
            CTO: { score: 89, status: 'Active', dueDate: '2025-06-22' },
            FC: { score: 86, status: 'Active', dueDate: '2025-10-18' }
        },
        departments: { environmental: 89, safety: 87, operations: 88, legal: 88 }
    },
    {
        id: 'durg-limestone',
        name: 'Durg Limestone Mine',
        location: 'Durg, Chhattisgarh',
        type: 'Limestone',
        complianceScore: 78,
        status: 'critical',
        documents: {
            EC: { score: 75, status: 'Critical', dueDate: '2024-01-18' },
            CTE: { score: 80, status: 'Active', dueDate: '2025-04-05' },
            CTO: { score: 79, status: 'Warning', dueDate: '2024-02-28' },
            FC: { score: 76, status: 'Critical', dueDate: '2024-01-22' }
        },
        departments: { environmental: 76, safety: 78, operations: 79, legal: 80 }
    }
]; 