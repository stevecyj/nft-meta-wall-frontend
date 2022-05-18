import Mock from 'mockjs';
export default [
  {
    // 取得所有貼文
    url: "/mock/api/posts",
    method: "get",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "count": 5,
            "limit": 10,
            "page": 1,
            "posts": [
                {
                    "id": "6283b510aca2110b67a74160",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "test-123",
                    "image": "",
                    "comments": [
                        {
                            "user": "627fa403e11fff95efe0cde6",
                            "comment": "test-comment",
                            "_id": "6283ea6595d0d4009a04333b",
                            "createdAt": "2022-05-17T18:33:09.518Z"
                        },
                        {
                            "user": "627fa403e11fff95efe0cde6",
                            "comment": "test-comment",
                            "_id": "6284b508479c3ac408e1aa81",
                            "createdAt": "2022-05-18T08:57:44.153Z"
                        }
                    ],
                    "createAt": "2022-05-17T14:45:36.536Z",
                    "likes": [
                        "627fa403e11fff95efe0cde6"
                    ]
                },
                {
                    "id": "6283b512aca2110b67a74162",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "11",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T14:45:38.878Z",
                    "likes": []
                },
                {
                    "id": "6283b515aca2110b67a74164",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "12",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T14:45:41.765Z",
                    "likes": []
                },
                {
                    "id": "6283b9efe12f1bbcbb175ea6",
                    "author": {
                        "_id": "627fa421afef8b2706d9e8f1",
                        "avatar": "123.jpg"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "13",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T15:06:23.921Z",
                    "likes": []
                },
                {
                    "id": "6283b9f2e12f1bbcbb175ea8",
                    "author": {
                        "_id": "627fa421afef8b2706d9e8f1",
                        "avatar": "123.jpg"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "14",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T15:06:26.030Z",
                    "likes": []
                }
            ]
        },
        "message": "成功取得全部貼文"
      }
    },
  },
  {
    // 取得指定 user 所有貼文
    url: "/posts/user/[A-Za-z0-9]",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "count": 3,
            "limit": 10,
            "page": 1,
            "posts": [
                {
                    "id": "6283b510aca2110b67a74160",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "test-123",
                    "image": "",
                    "comments": [
                        {
                            "user": "627fa403e11fff95efe0cde6",
                            "comment": "test-comment",
                            "_id": "6283ea6595d0d4009a04333b",
                            "createdAt": "2022-05-17T18:33:09.518Z"
                        },
                        {
                            "user": "627fa403e11fff95efe0cde6",
                            "comment": "test-comment",
                            "_id": "6284b508479c3ac408e1aa81",
                            "createdAt": "2022-05-18T08:57:44.153Z"
                        }
                    ],
                    "createAt": "2022-05-17T14:45:36.536Z",
                    "likes": [
                        "627fa403e11fff95efe0cde6"
                    ]
                },
                {
                    "id": "6283b512aca2110b67a74162",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "11",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T14:45:38.878Z",
                    "likes": []
                },
                {
                    "id": "6283b515aca2110b67a74164",
                    "author": {
                        "_id": "627fa403e11fff95efe0cde6",
                        "avatar": "123.png"
                    },
                    "tags": [],
                    "type": "person",
                    "content": "12",
                    "image": "",
                    "comments": [],
                    "createAt": "2022-05-17T14:45:41.765Z",
                    "likes": []
                }
            ]
        },
        "message": "成功取得全部貼文"
      }
    },
  },
  {
    // 取得指定貼文
    url: "/post/[A-Za-z0-9]",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "_id": "6283b510aca2110b67a74160",
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test-123",
            "likes": [
                "627fa403e11fff95efe0cde6"
            ],
            "comments": [
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6283ea6595d0d4009a04333b",
                    "createdAt": "2022-05-17T18:33:09.518Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284b508479c3ac408e1aa81",
                    "createdAt": "2022-05-18T08:57:44.153Z"
                }
            ],
            "createAt": "2022-05-17T14:45:36.536Z"
        },
        "message": "成功取得單筆貼文"
      }
    }
  },
  {
    // 新增貼文
    url: "/post",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test",
            "likes": [],
            "_id": "6284d85a294183e4436c9d20",
            "createAt": "2022-05-18T11:28:26.260Z",
            "comments": []
        },
        "message": "新增貼文成功"
      }
    }
  },
  {
    // 新增指定貼文內留言
    url: "/post/[A-Za-z0-9]/comments",
    method: "post",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "_id": "6283b510aca2110b67a74160",
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test-123",
            "likes": [
                "627fa403e11fff95efe0cde6"
            ],
            "comments": [
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6283ea6595d0d4009a04333b",
                    "createdAt": "2022-05-17T18:33:09.518Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284b508479c3ac408e1aa81",
                    "createdAt": "2022-05-18T08:57:44.153Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284d947cecc59b7e94d93c2",
                    "createdAt": "2022-05-18T11:32:23.593Z"
                }
            ],
            "createAt": "2022-05-17T14:45:36.536Z"
        },
        "message": "新增留言成功"
      }
    }
  },
  {
    // 修改指定貼文
    url: "/post/[A-Za-z0-9]",
    method: "patch",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "_id": "6283b510aca2110b67a74160",
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test-123",
            "likes": [
                "627fa403e11fff95efe0cde6"
            ],
            "comments": [
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6283ea6595d0d4009a04333b",
                    "createdAt": "2022-05-17T18:33:09.518Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284b508479c3ac408e1aa81",
                    "createdAt": "2022-05-18T08:57:44.153Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284d947cecc59b7e94d93c2",
                    "createdAt": "2022-05-18T11:32:23.593Z"
                }
            ],
            "createAt": "2022-05-17T14:45:36.536Z"
        },
        "message": "更新貼文內容成功"
      }
    }
  },
  {
    // 修改指定貼文按讚數
    url: "/post/[A-Za-z0-9]/likes",
    method: "patch",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "_id": "6283b510aca2110b67a74160",
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test-123",
            "likes": [
                "627fa403e11fff95efe0cde6"
            ],
            "comments": [
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6283ea6595d0d4009a04333b",
                    "createdAt": "2022-05-17T18:33:09.518Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284b508479c3ac408e1aa81",
                    "createdAt": "2022-05-18T08:57:44.153Z"
                },
                {
                    "user": "627fa403e11fff95efe0cde6",
                    "comment": "test-comment",
                    "_id": "6284d947cecc59b7e94d93c2",
                    "createdAt": "2022-05-18T11:32:23.593Z"
                }
            ],
            "createAt": "2022-05-17T14:45:36.536Z"
        },
        "message": "更新成功"
      }
    }
  },
  {
    // 刪除指定貼文
    url: "/post/[A-Za-z0-9]",
    method: "delete",
    statusCode: 200,
    response: ({}) => {
      return {
        "status": "success",
        "data": {
            "_id": "6283ea5595d0d4009a043338",
            "author": "627fa403e11fff95efe0cde6",
            "tags": [],
            "type": "person",
            "image": "",
            "content": "test",
            "likes": [],
            "createAt": "2022-05-17T18:32:53.133Z",
            "comments": []
        },
        "message": "刪除貼文成功"
      }
    }
  },
];