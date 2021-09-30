export const environment = {
    production: false,
    url_base: 'https://api.rutadelpuma.cl',
    empresa: {
        getEmpresas: '/app/get-empresas',
        getEmpresa: '/empresa/get-empresa',
    },
    imagenes: {
        getAlbum: '/imagenes/get-album'
    },
    comentarios: {
        getComentarios: '/app/get-comentarios',
        sendComentario: '/app/send-comentario'
    },
    usuario: {
        login: '/app/login'
    }
};
