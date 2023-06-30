import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import axios from "@/utils/axios";


export const useWorkSpaceData = defineStore('workSpaceData', () => {

    const boardId = ref(0)
    const boardsData = reactive([
        {
            id: 1,
            owner: 'Vic',
            title: '每週專案進度',
            description: '2021 高爾夫球案的所有資料 2021 高爾夫球案的所有資料',
            isArchive: false,
            cards: [
                {
                    name:'啟動',
                    content: ''
                },
                {
                    name:'規劃',
                    content: ''
                },
                {
                    name:'執行',
                    content: ''
                },
                {
                    name:'監控',
                    content: ''
                },
                {
                    name:'結案',
                    content: ''
                },
                {
                    name:'運動科技開發',
                    content: ''
                },
                {
                    name:'運動科技驗收',
                    content: ''
                }
            ]
        },
        {
            id: 2,
            owner: 'Vic',
            title: '產品部會議紀錄',
            description: '會議紀錄',
            isArchive: false,
            cards: [
                {
                    name:'架構設計',
                    content: ''
                },
                {
                    name:'需求規劃',
                    content: ''
                },
                {
                    name:'參考資料',
                    content: ''
                },
                {
                    name:'週會',
                    content: ''
                },
            ]
        }
    ])
    const boardData = reactive({})
    const workSpaces = reactive([
        {
            owner: 'Vic',
            ownerId: 'Vic123',
            boardNum: 2,
            boards: [
            {
                id: 1,
                title: '每週專案進度',
                description: '2021 高爾夫球案的所有資料 2021 高爾夫球案的所有資料',
                isArchive: false,
                isPinned: false,
                cards: [
                    {
                        name:'啟動',
                        content: ''
                    },
                    {
                        name:'規劃',
                        content: ''
                    },
                    {
                        name:'執行',
                        content: ''
                    },
                    {
                        name:'監控',
                        content: ''
                    },
                    {
                        name:'結案',
                        content: ''
                    },
                    {
                        name:'運動科技開發',
                        content: ''
                    },
                    {
                        name:'運動科技驗收',
                        content: ''
                    }
                ]
            },
            {
                id: 2,
                title: '產品部會議紀錄',
                description: '會議紀錄',
                isArchive: false,
                isPinned: false,
                cards: [
                {
                    name:'架構設計',
                    content: ''
                },
                {
                    name:'需求規劃',
                    content: ''
                },
                {
                    name:'參考資料',
                    content: ''
                },
                {
                    name:'週會',
                    content: ''
                },
                ]
            },
            {
                id: 3,
                title: '產品部會議紀錄eded',
                description: '會議紀錄',
                isArchive: false,
                isPinned: false,
                cards: [
                {
                    name:'架構設計',
                    content: ''
                },
                {
                    name:'需求規劃',
                    content: ''
                },
                {
                    name:'參考資料',
                    content: ''
                },
                {
                    name:'週會',
                    content: ''
                },
                ]
            },
            {
                id: 3,
                title: '產品部會議紀錄eded',
                description: '會議紀錄',
                isArchive: false,
                isPinned: false,
                cards: [
                {
                    name:'架構設計',
                    content: ''
                },
                {
                    name:'需求規劃',
                    content: ''
                },
                {
                    name:'參考資料',
                    content: ''
                },
                {
                    name:'週會',
                    content: ''
                },
                ]
            }
            ]
        },
        {
            owner: 'Iven',
            ownerId: 'Iven123',
            boardNum: 2,
            boards: [
            {
                id: 3,
                title: 'Iven-架構',
                description: '2021 高爾夫球案的所有資料 2021 高爾夫球案的所有資料',
                isArchive: false,
                isPinned: false,
                cards: [
                    {
                        name:'啟動',
                        content: ''
                    },
                    {
                        name:'規劃',
                        content: ''
                    },
                    {
                        name:'執行',
                        content: ''
                    },
                    {
                        name:'監控',
                        content: ''
                    },
                    {
                        name:'結案',
                        content: ''
                    },
                    {
                        name:'運動科技開發',
                        content: ''
                    },
                    {
                        name:'運動科技驗收',
                        content: ''
                    }
                ]
            },
            {
                id: 4,
                title: 'Iven-example',
                description: '會議紀錄',
                isArchive: false,
                isPinned: false,
                cards: [
                {
                    name:'架構設計',
                    content: ''
                },
                {
                    name:'需求規劃',
                    content: ''
                },
                {
                    name:'參考資料',
                    content: ''
                },
                {
                    name:'週會',
                    content: ''
                },
                ]
            }
            ]
        },
    ])
    const archiveBoards = reactive([])
    const pinBoardsData = reactive([])


    // get all workspace api
    const getWorkSpaces = async () => {
        return await axios.get('http://127.0.0.1:8500/api/workspaces').then((response) => response)
        // return await axios.get('/workspaces').then((response) => response)        
    }

    // post workspace api
    const postWorkSpace = async (newSpace) => {
        console.log('postWorkSpace newSpace', newSpace)
        await axios.post('http://127.0.0.1:8500/api/workspaces', newSpace)
    }


    return {
        workSpaces,
        archiveBoards,
        pinBoardsData,
        boardsData,
        boardData,
        boardId,
        getWorkSpaces,
        postWorkSpace
    }
})