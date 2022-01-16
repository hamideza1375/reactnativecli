import http from "./httpService";
const localHost = 'http://192.168.43.171:80';
const serverHost = 'http://78.47.189.94';



// { headers: { "Content-Type": "multipart/form-data" } }

export const createCourse = async (data) => http.post(`${localHost}/createcourse`, data)


export const getCourses = async () => http.get(`${localHost}/getcourses`);


export const getCourse = async (courseId) => http.get(`${localHost}/getcourseId/${courseId}`);


export const editCourse = (courseId, data) => http.put(`${localHost}/editcourse/${courseId}`, data);


export const deleteCourse = (courseId) => http.delete(`${localHost}/deletecourse/${courseId}`);


export const partCourse = (courseId, data) => http.post(`${localHost}/partcourse/${courseId}`, data);


export const getPartCourse = async (courseId) => http.get(`${localHost}/getpartcourse/${courseId}`);


export const getSinglePartCourse = async (courseId) => http.get(`${localHost}/getSinglePartCourse/${courseId}`);


export const editPartCourse = async (courseId, data) => http.put(`${localHost}/editpartcourse/${courseId}`, data);


export const commentCourse = (courseId, data) => http.post(`${localHost}/commentcourse/${courseId}`, data);


export const getComment = (courseId) => http.get(`${localHost}/getcommentcourse/${courseId}`);


// payment
export const payment = (courseId) => http.get(`${localHost}/confirmpayment/${courseId}`);


export const verifypayment = () => http.get(`${localHost}/verifypayment`);
// end payment


export const editlikecourse = (courseId, data) => http.put(`${localHost}/editlikecourse/${courseId}`, data);


export const getTrueLike = (courseId) => http.get(`${localHost}/gettruelike/${courseId}`);


export const downloadCourse = async (courseId) => http.post(`${localHost}/download/${courseId}`);

// export const downvideo = async (data) => http.post(`http://192.168.43.171/downvideo`, data);
