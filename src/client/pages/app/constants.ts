// -- admin  应用列表

export const adminAppList ={
    "code": 200,
    "data": [
        {
            "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud",
            "fdCreateTime": "2024-02-25 19:05:56",
            "fdUpdateTime": "2024-02-25 19:05:56",
            "fdAppName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 6,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": null,
            "fdIsSystem": null
        },
        {
            "fdId": "1hk0c0uqu1sva8o23spns3n28ptu8br6gdb5",
            "fdCreateTime": "2024-01-13 10:57:11",
            "fdUpdateTime": "2024-01-13 10:57:11",
            "fdAppName": "架构可视化",
            "fdIcon": "drawio",
            "fdUrl": null,
            "fdDisplayOrder": 5,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": "架构可视化",
            "fdIsSystem": null
        },
        {
            "fdId": "1hi31081q1f9i0f12vfkpas3vsdq513ju7qt",
            "fdCreateTime": "2023-12-20 15:10:52",
            "fdUpdateTime": "2024-01-03 14:53:57",
            "fdAppName": "微前端demo",
            "fdIcon": "micro",
            "fdUrl": "https://single-spa.js.org/",
            "fdDisplayOrder": 3,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": "微前端示例项目",
            "fdIsSystem": null
        },
        {
            "fdId": "1hfmjv0b6ost9aa270atjm14d6s912c8roj2",
            "fdCreateTime": null,
            "fdUpdateTime": "2023-12-14 10:13:17",
            "fdAppName": "first-demo",
            "fdIcon": null,
            "fdUrl": "http://www.baidu.com",
            "fdDisplayOrder": 1,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": "第一个用于测试一下子",
            "fdIsSystem": null
        },
        {
            "fdId": "1hg82f58dreme6v2nar5ph23nu3eh1od1uo3",
            "fdCreateTime": null,
            "fdUpdateTime": "2023-12-20 13:00:54",
            "fdAppName": "运维管理项目",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 1,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": "运维管理项目，事件管理表单",
            "fdIsSystem": null
        },
        {
            "fdId": "1hni3mre01e9ilm11vb1am52c3iofo4la3bj",
            "fdCreateTime": "2024-02-26 15:05:16",
            "fdUpdateTime": "2024-02-26 15:05:16",
            "fdAppName": "demo",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 1,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": null,
            "fdIsSystem": null
        }
    ],
    "success": true
}


// -- 应急预案的导航
export const adminTopMenu = 

{
    "code": 200,
    "data": [
        {
            "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui",
            "fdComponentName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 1,
            "fdPermission": "banner:emergency-plan",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-25 19:06:15",
            "fdUpdateTime": "2024-02-25 19:06:15",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": null,
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        }
    ],
    "success": true
}


// -- 导航内的菜单和按钮
export const adminChildMenu =
{
    "code": 200,
    "data": [
        {
            "fdId": "1hnlljhja3iir9cn3qiqhc61ecf8ef33e1r8",
            "fdComponentName": "技术处置方案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": null,
            "fdPermission": "menu:emergency-plan:handle",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-28 00:15:45",
            "fdUpdateTime": "2024-02-28 00:15:45",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui"
            },
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        },
        {
            "fdId": "1hnllkvlj1ukqd0m493ue5gieu39l8crgp1k",
            "fdComponentName": "演练记录",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": null,
            "fdPermission": "menu:emergency-plan:action",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-28 00:16:32",
            "fdUpdateTime": "2024-02-28 00:16:32",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui"
            },
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [
                {
                    "fdId": "1hnn5rana2mkp00b3fashb5311suuvguk6ba",
                    "fdComponentName": "发起演练",
                    "fdIcon": null,
                    "fdUrl": null,
                    "fdDisplayOrder": null,
                    "fdPermission": "button:emergency-plan:action:add",
                    "fdPermissionName": null,
                    "fdCreateTime": "2024-02-28 14:18:52",
                    "fdUpdateTime": "2024-02-28 14:18:52",
                    "fdVisiable": 1,
                    "fdRemark": "发起演练",
                    "fdParentEntity": {
                        "fdName": "演练记录",
                        "fdId": "1hnllkvlj1ukqd0m493ue5gieu39l8crgp1k"
                    },
                    "fdAppEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
                    },
                    "children": [],
                    "fdRoleEntities": null,
                    "fdOperations": null,
                    "fdType": "button"
                },
                {
                    "fdId": "1hnn5ri9163bftu2e24hf33m36ioo3rvdlha",
                    "fdComponentName": "打印PDF",
                    "fdIcon": null,
                    "fdUrl": null,
                    "fdDisplayOrder": null,
                    "fdPermission": "button:emergency-plan:action:print-pdf",
                    "fdPermissionName": null,
                    "fdCreateTime": "2024-02-28 14:19:00",
                    "fdUpdateTime": "2024-02-28 14:19:00",
                    "fdVisiable": 1,
                    "fdRemark": "打印PDF",
                    "fdParentEntity": {
                        "fdName": "演练记录",
                        "fdId": "1hnllkvlj1ukqd0m493ue5gieu39l8crgp1k"
                    },
                    "fdAppEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
                    },
                    "children": [],
                    "fdRoleEntities": null,
                    "fdOperations": null,
                    "fdType": "button"
                }
            ],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        },
        {
            "fdId": "1hnlllqhakn24a62aml8oo35qdiaa8crh6kj",
            "fdComponentName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": null,
            "fdPermission": "menu:emergency-plan:plan",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-28 00:17:00",
            "fdUpdateTime": "2024-02-28 00:17:00",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui"
            },
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [
                {
                    "fdId": "1hnn59c5i1kkp2ms28n3er712oi14s3dtl10",
                    "fdComponentName": "新增预案",
                    "fdIcon": null,
                    "fdUrl": null,
                    "fdDisplayOrder": null,
                    "fdPermission": "button:emergency-plan:plan:add",
                    "fdPermissionName": null,
                    "fdCreateTime": "2024-02-28 14:09:04",
                    "fdUpdateTime": "2024-02-28 14:09:04",
                    "fdVisiable": 1,
                    "fdRemark": "新增预案",
                    "fdParentEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnlllqhakn24a62aml8oo35qdiaa8crh6kj"
                    },
                    "fdAppEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
                    },
                    "children": [],
                    "fdRoleEntities": null,
                    "fdOperations": null,
                    "fdType": "button"
                }
            ],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        }
    ],
    "success": true
}

// -- 张三
export const commonAppList ={
    "code": 200,
    "data": [
        {
            "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud",
            "fdCreateTime": "2024-02-25 19:05:56",
            "fdUpdateTime": "2024-02-25 19:05:56",
            "fdAppName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 6,
            "fdPermission": null,
            "fdPermissionName": null,
            "fdVisiable": 1,
            "fdRemark": null,
            "fdIsSystem": null
        },
    ],
    "success": true
}


export const commonTopMenu = 

{
    "code": 200,
    "data": [
        {
            "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui",
            "fdComponentName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": 1,
            "fdPermission": "banner:emergency-plan",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-25 19:06:15",
            "fdUpdateTime": "2024-02-25 19:06:15",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": null,
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        }
    ],
    "success": true
}

export const commonChildMenu =
{
    "code": 200,
    "data": [
        {
            "fdId": "1hnlllqhakn24a62aml8oo35qdiaa8crh6kj",
            "fdComponentName": "应急预案",
            "fdIcon": null,
            "fdUrl": null,
            "fdDisplayOrder": null,
            "fdPermission": "menu:emergency-plan:plan",
            "fdPermissionName": null,
            "fdCreateTime": "2024-02-28 00:17:00",
            "fdUpdateTime": "2024-02-28 00:17:00",
            "fdVisiable": 1,
            "fdRemark": null,
            "fdParentEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv3ck72m6jpak3t80u3o3ud4qds3lp2ui"
            },
            "fdAppEntity": {
                "fdName": "应急预案",
                "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
            },
            "children": [
                {
                    "fdId": "1hnn59c5i1kkp2ms28n3er712oi14s3dtl10",
                    "fdComponentName": "新增预案",
                    "fdIcon": null,
                    "fdUrl": null,
                    "fdDisplayOrder": null,
                    "fdPermission": "button:emergency-plan:plan:add",
                    "fdPermissionName": null,
                    "fdCreateTime": "2024-02-28 14:09:04",
                    "fdUpdateTime": "2024-02-28 14:09:04",
                    "fdVisiable": 1,
                    "fdRemark": "新增预案",
                    "fdParentEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnlllqhakn24a62aml8oo35qdiaa8crh6kj"
                    },
                    "fdAppEntity": {
                        "fdName": "应急预案",
                        "fdId": "1hnfv2q3i1pfqb153f618i33cgp0t518a8ud"
                    },
                    "children": [],
                    "fdRoleEntities": null,
                    "fdOperations": null,
                    "fdType": "button"
                }
            ],
            "fdRoleEntities": null,
            "fdOperations": null,
            "fdType": null
        }
    ],
    "success": true
}