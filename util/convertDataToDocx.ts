export const convertDataToDocx = (attributeValues: any) => {
    const result: any = {};

    attributeValues.forEach(item => {
        const key = item.attributeFormService.id.toString();
        const value = item.value;

        if (item.attributeFormService.type === "Checkbox" || item.attributeFormService.type === "Select") {
            if (!result[key]) {
                result[key] = {};
            }
            result[key][value] = true;
        } else {
            result[key] = value;
        }
    });

    return result;
}



/*
input :
 [
        {
            "id": 119,
            "value": "Ma Seo Tráng",
            "created_at": "2024-04-29T08:23:18.686Z",
            "updated_at": "2024-04-29T08:23:18.686Z",
            "attributeFormService": {
                "id": 1,
                "name": "Họ tên sinh viên",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.441Z",
                "updated_at": "2024-03-27T02:25:29.441Z"
            }
        },
        {
            "id": 120,
            "value": "10/12/2001",
            "created_at": "2024-04-29T08:23:18.716Z",
            "updated_at": "2024-04-29T08:23:18.716Z",
            "attributeFormService": {
                "id": 2,
                "name": "Ngày sinh",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.458Z",
                "updated_at": "2024-03-27T02:25:29.458Z"
            }
        },
        {
            "id": 121,
            "value": "DTC19H4801030040",
            "created_at": "2024-04-29T08:23:18.734Z",
            "updated_at": "2024-04-29T08:23:18.734Z",
            "attributeFormService": {
                "id": 3,
                "name": "Mã sinh viên",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.479Z",
                "updated_at": "2024-03-27T02:25:29.479Z"
            }
        },
        {
            "id": 122,
            "value": "0386640397",
            "created_at": "2024-04-29T08:23:18.736Z",
            "updated_at": "2024-04-29T08:23:18.736Z",
            "attributeFormService": {
                "id": 4,
                "name": "Số điện thoại",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.513Z",
                "updated_at": "2024-03-27T02:25:29.513Z"
            }
        },
        {
            "id": 123,
            "value": "1",
            "created_at": "2024-04-29T08:23:18.738Z",
            "updated_at": "2024-04-29T08:23:18.738Z",
            "attributeFormService": {
                "id": 6,
                "name": "Lí do",
                "type": "Checkbox",
                "created_at": "2024-03-27T02:25:29.555Z",
                "updated_at": "2024-03-27T02:25:29.555Z"
            },
            "enum": {
                "id": 1,
                "name": " Điểm trung bình học kỳ bị sai ",
                "created_at": "2024-03-27T02:25:29.596Z",
                "updated_at": "2024-03-27T02:25:29.596Z"
            }
        },
        {
            "id": 124,
            "value": "KTPMK18A",
            "created_at": "2024-04-29T08:23:18.755Z",
            "updated_at": "2024-04-29T08:23:18.755Z",
            "attributeFormService": {
                "id": 5,
                "name": "Lớp quản lí sinh viên",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.527Z",
                "updated_at": "2024-03-27T02:25:29.527Z"
            }
        },
        {
            "id": 125,
            "value": "2",
            "created_at": "2024-04-29T08:23:18.758Z",
            "updated_at": "2024-04-29T08:23:18.758Z",
            "attributeFormService": {
                "id": 6,
                "name": "Lí do",
                "type": "Checkbox",
                "created_at": "2024-03-27T02:25:29.555Z",
                "updated_at": "2024-03-27T02:25:29.555Z"
            },
            "enum": {
                "id": 2,
                "name": "Chưa cập nhật, không thấy điểm học phần ",
                "created_at": "2024-03-27T02:25:29.597Z",
                "updated_at": "2024-03-27T02:25:29.597Z"
            }
        },
        {
            "id": 126,
            "value": "1",
            "created_at": "2024-04-29T08:23:18.773Z",
            "updated_at": "2024-04-29T08:23:18.773Z",
            "attributeFormService": {
                "id": 8,
                "name": "Lần thi (nếu có)",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.620Z",
                "updated_at": "2024-03-27T02:25:29.620Z"
            }
        },
        {
            "id": 127,
            "value": "1",
            "created_at": "2024-04-29T08:23:18.774Z",
            "updated_at": "2024-04-29T08:23:18.774Z",
            "attributeFormService": {
                "id": 7,
                "name": "Học kì",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.597Z",
                "updated_at": "2024-03-27T02:25:29.597Z"
            }
        },
        {
            "id": 128,
            "value": "1",
            "created_at": "2024-04-29T08:23:18.776Z",
            "updated_at": "2024-04-29T08:23:18.776Z",
            "attributeFormService": {
                "id": 9,
                "name": "Năm học",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.634Z",
                "updated_at": "2024-03-27T02:25:29.634Z"
            }
        },
        {
            "id": 129,
            "value": "MHP1",
            "created_at": "2024-04-29T08:23:18.778Z",
            "updated_at": "2024-04-29T08:23:18.778Z",
            "attributeFormService": {
                "id": 10,
                "name": "Tên học phần/Mã học phần",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.649Z",
                "updated_at": "2024-03-27T02:25:29.649Z"
            }
        },
        {
            "id": 130,
            "value": "Chưa",
            "created_at": "2024-04-29T08:23:18.783Z",
            "updated_at": "2024-04-29T08:23:18.783Z",
            "attributeFormService": {
                "id": 11,
                "name": "Đã khảo thí/Chưa khảo thí",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.662Z",
                "updated_at": "2024-03-27T02:25:29.662Z"
            }
        },
        {
            "id": 131,
            "value": "3",
            "created_at": "2024-04-29T08:23:18.797Z",
            "updated_at": "2024-04-29T08:23:18.797Z",
            "attributeFormService": {
                "id": 12,
                "name": "Tình trạng điểm",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.674Z",
                "updated_at": "2024-03-27T02:25:29.674Z"
            }
        },
        {
            "id": 132,
            "value": "5",
            "created_at": "2024-04-29T08:23:18.804Z",
            "updated_at": "2024-04-29T08:23:18.804Z",
            "attributeFormService": {
                "id": 26,
                "name": "Giới tính",
                "type": "Select",
                "created_at": null,
                "updated_at": "2024-04-19T02:53:40.213Z"
            },
            "enum": {
                "id": 5,
                "name": "Nam",
                "created_at": null,
                "updated_at": null
            }
        },
        {
            "id": 133,
            "value": "không có",
            "created_at": "2024-04-29T08:23:18.811Z",
            "updated_at": "2024-04-29T08:23:18.811Z",
            "attributeFormService": {
                "id": 13,
                "name": "Lý do khác",
                "type": "Input",
                "created_at": "2024-03-27T02:25:29.683Z",
                "updated_at": "2024-03-27T02:25:29.683Z"
            }
        }
    ]


output :
{
    "1": "Ma Seo Tráng",
    "2": "10/12/2001",
    "3": "DTC19H4801030040",
    "4": "0386640397",
    "5": "KTPMK18A",
    "6": [
        "1",
        "2"
    ],
    "7": "1",
    "8": "1",
    "9": "1",
    "10": "MHP1",
    "11": "Chưa",
    "12": "3",
    "13": "không có",
    "26": [
        "5"
    ]
}
*/