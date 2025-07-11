export const initialTasks = [
    {
        id: '1',
        title: 'Water Quality Monitoring - Site A',
        leaseName: 'Northern Fields Lease',
        area: 150.5,
        conditionType: 'Environmental',
        priority: 1,
        assignedTo: 'John Smith',
        assignedBy: 'Sarah Johnson',
        createDate: '2024-01-15',
        deadline: '2024-02-15',
        completionDate: null,
        approvedDate: null,
        validationDate: null,
        closureDate: null,
        reopenedDate: null,
        evidence: [],
        comments: [],
        validationStatus: 'pending',
        column: 'assigned'
    },
    {
        id: '2',
        title: 'Soil Contamination Assessment',
        leaseName: 'Eastern Block Lease',
        area: 200.0,
        conditionType: 'Regulatory',
        priority: 2,
        assignedTo: 'Mike Davis',
        assignedBy: 'Sarah Johnson',
        createDate: '2024-01-20',
        deadline: '2024-03-01',
        completionDate: '2024-02-28',
        approvedDate: null,
        validationDate: null,
        closureDate: null,
        reopenedDate: null,
        evidence: ['soil_sample_1.pdf', 'lab_report_001.pdf'],
        comments: ['Initial samples collected', 'Waiting for lab results'],
        validationStatus: 'pending',
        column: 'evidence-submitted'
    },
    {
        id: '3',
        title: 'Air Quality Compliance Check',
        leaseName: 'Western Ridge Lease',
        area: 85.2,
        conditionType: 'Environmental',
        priority: 3,
        assignedTo: 'Lisa Chen',
        assignedBy: 'Tom Wilson',
        createDate: '2024-01-25',
        deadline: '2024-02-28',
        completionDate: '2024-02-27',
        approvedDate: '2024-02-29',
        validationDate: '2024-03-01',
        closureDate: null,
        reopenedDate: null,
        evidence: ['air_quality_report.pdf'],
        comments: ['Measurements completed', 'Report submitted for review'],
        validationStatus: 'validated',
        column: 'in-progress'
    }
];

export const complianceData = {
    "Northern Fields Lease": {
        areas: {
            "150.5": {
                documents: {
                    "Environmental Assessment Report": {
                        conditionTypes: {
                            "Environmental": {
                                shortenedConditions: {
                                    "Water quality monitoring required": "Conduct monthly water quality tests at designated sampling points to ensure compliance with environmental standards",
                                    "Air quality assessment needed": "Perform quarterly air quality measurements and submit reports to regulatory authority"
                                }
                            },
                            "Regulatory": {
                                shortenedConditions: {
                                    "Permit renewal required": "Submit permit renewal application with supporting documentation 60 days before expiration",
                                    "Compliance report submission": "Submit quarterly compliance reports detailing all environmental monitoring activities"
                                }
                            }
                        }
                    },
                    "Safety Management Plan": {
                        conditionTypes: {
                            "Safety": {
                                shortenedConditions: {
                                    "Safety training mandatory": "All personnel must complete safety training program before site access",
                                    "Equipment inspection required": "Monthly inspection of all safety equipment and emergency response systems"
                                }
                            }
                        }
                    }
                }
            },
            "200.0": {
                documents: {
                    "Impact Assessment Study": {
                        conditionTypes: {
                            "Environmental": {
                                shortenedConditions: {
                                    "Soil contamination check": "Conduct soil contamination assessment at specified locations using approved methodology",
                                    "Groundwater monitoring": "Install groundwater monitoring wells and conduct monthly sampling"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Eastern Block Lease": {
        areas: {
            "200.0": {
                documents: {
                    "Regulatory Compliance Manual": {
                        conditionTypes: {
                            "Regulatory": {
                                shortenedConditions: {
                                    "License verification needed": "Verify all operational licenses are current and compliant with regulations",
                                    "Documentation review required": "Review and update all regulatory documentation annually"
                                }
                            },
                            "Operational": {
                                shortenedConditions: {
                                    "Operational audit required": "Conduct comprehensive operational audit to ensure compliance with lease terms",
                                    "Performance metrics review": "Review operational performance metrics against agreed benchmarks"
                                }
                            }
                        }
                    }
                },
                "175.8": {
                    documents: {
                        "Environmental Impact Report": {
                            conditionTypes: {
                                "Environmental": {
                                    shortenedConditions: {
                                        "Biodiversity assessment": "Conduct biodiversity impact assessment in sensitive ecological areas",
                                        "Waste management review": "Review and optimize waste management procedures for environmental compliance"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "Western Ridge Lease": {
        areas: {
            "85.2": {
                documents: {
                    "Air Quality Management Plan": {
                        conditionTypes: {
                            "Environmental": {
                                shortenedConditions: {
                                    "Air quality compliance check": "Conduct air quality measurements to ensure compliance with emission standards",
                                    "Dust control measures": "Implement and monitor dust control measures during operational activities"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}; 