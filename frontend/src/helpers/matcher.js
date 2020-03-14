export const LOCALHOSTIP = 'http://127.0.0.1:8000';
//export const LOGIN = `${LOCALHOSTIP}/account/api/auth/login`;
export const LOGIN = `${LOCALHOSTIP}/api/token/`;
export const GETINFOACCOUNT = `${LOCALHOSTIP}/account/api/get`;
//export const REFRESH = `${LOCALHOSTIP}/api/refresh/`;
export const LOGOUT = `${LOCALHOSTIP}/account/api/auth/logout`;
export const CHANGEPASSWORD = `${LOCALHOSTIP}/account/api/auth/change_password`;
export const REGISTER = `${LOCALHOSTIP}/account/api/auth/register`;

export const TOPPOPULAR = `${LOCALHOSTIP}/movie/api/topPopular`;
export const TOPRANKING = `${LOCALHOSTIP}/movie/api/topRanking`;
export const GENRES = `${LOCALHOSTIP}/movie/api/genres`;
export const SEARCHMOVIEWITHGENRE = `${LOCALHOSTIP}/movie/api/topPopular/`;

export const RECOMMENDMOVIE = `${LOCALHOSTIP}/movie/api/recommend/`;
export const DETAILSMOVIE = `${LOCALHOSTIP}/movie/api/get/`;
export const SEARCHMOVIEBYID = `${LOCALHOSTIP}/movie/api/search/`;

export const MANAGEFAVORITEMOVIE = `${LOCALHOSTIP}/account/api/favorite`;
export const MANAGEVOTEDMOVIE = `${LOCALHOSTIP}/account/api/voted`;

export const SEARCHMOVIEBYTITLE = `${LOCALHOSTIP}/movie/api/title/?search=`;