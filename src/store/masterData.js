import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { allDashboardData } from '../data'

const INITIAL_DATA = {
    dashboardData: allDashboardData,
}

const useDashboardStore = create(persist(set => ({
    ...INITIAL_DATA,
    removeWidget: async ({id, category}) => {
        const dashboardData = useDashboardStore.getState().dashboardData
        const modifiedData = dashboardData[category]

        const filteredChangedData = modifiedData?.maindata?.filter((data) => data?.id === id)
        const filteredunChangedData = modifiedData?.maindata?.filter((data) => data?.id !== id)
        let modifiedWidget = [{...filteredChangedData[0], available: false}]

        const newDashboardData = {
            ...dashboardData,
            [category]: {
                maindata: [...filteredunChangedData, ...modifiedWidget]
            }
        };
        set({
            dashboardData:  newDashboardData
        })
    },
    updateDashboardCategory: async (modifiedWidget, category) => {
        const dashboardData = useDashboardStore.getState().dashboardData;

        const newDashboardData = {
            ...dashboardData,
            [category]: {
                maindata: modifiedWidget.maindata
            }
        };
        set({
            dashboardData:  newDashboardData
        })
    }
}), {
    name: "masterStore",
    version: 1
}))

export default useDashboardStore;