import React,{useEffect,useState} from 'react';

import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,Image, FlatList,Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';



import styles from './styles';

import LogoImg from '../../assets/logo.png';

export default function Incidents(){
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal]= useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading]=useState(false);

    const navigation = useNavigation();
    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }


    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total>0 && incidents.length === total){
            return;

        }
        setLoading(true)
        const res = await api.get('/incidents',{
            params:{page}
        });
        setIncidents([...incidents,...res.data]);
        setTotal(res.headers['X-Total-Count']);
        setPage(page + 1);
        setLoading(false);

    }
    useEffect(()=>{
        loadIncidents();
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg}/>
                <Text style={styles.headerText}>
                    Total de 
                    <Text style={styles.headerTextBold}> {total} Casos.</Text>
                </Text>
            
            </View>{/* Header */}
            {/* Initial Texts */}
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia</Text>

            
           
            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident=>String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident })=>(
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat(
                                'pt-br',{
                                    style:'currency',
                                    currency:'BRL'
                                    }).format(incident.value)}</Text>
                        <TouchableOpacity 
                            style={styles.detailButton} 
                            onPress={()=>navigateToDetail(incident)}
                        >
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>

                        </TouchableOpacity>
                {/* Fim do Incident */}
                 </View>
                )}
            />{/* FlatList */}


          
        {/* Container */}            
        </View>
    );
}