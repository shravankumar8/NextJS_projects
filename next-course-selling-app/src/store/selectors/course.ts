import { selector } from "recoil";
import { userState } from "../atoms/user";
import { courseState } from "../atoms/course";
// selector for to check is course is loading
 export const isCourseLoading=selector({
    key:'isCourseLoadingState',
    get:({get})=>{
        const state=get(courseState)
        return state.isLoading
    }
 })
 //  selector for course complete course
 export const courseDetails=selector({
    key : 'courseDetailsState',
    get:({get})=>{
        const state=get(courseState);
        return state.course
    }
 })
//  selector for course title 
export const courseTitle=selector({
    key:"courseTitleSate",
    get:({get})=>{
        const state=get(courseState);
        if(state.course){
            return state.course.title
        }

    }
})
export const coursePrice=selector({
    key:"coursePriceState",
    get:({get})=>{
        const state=get(courseState);
        if(state.course){
            return state.course.price
        }

    }
})
export const courseImage=selector({
    key:"courseImageState",
    get:({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.imageLink

    }}

})
