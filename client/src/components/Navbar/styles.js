import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: "80px",
        position:'relative'
    },
    toolBar:{
      textAlign:'right'
    },

    heading: {
        color: 'rgba(0,183,255, 1)',
        marginLeft: '100px'
    },
    image: {
        marginLeft: '15px',
    },

    profile:{
        display:'block',
        float:'left',
        margin: '0px 20px'
    }
}));
