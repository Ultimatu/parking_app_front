import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import UserForm from './UserForm';
import authStore from '../../services/auth/auth.store';
import { deleteUser, getAllUsers, updateUser } from '../../services/api/adminEndpoint';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const UserList = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    console.log("first debugger", showUserForm)


    const getToken = async () => {
        const token = await authStore.getJwtToken();
        return token;
    }
    const fetchUsers = async () => {
        setIsLoading(true);
        const token = await getToken();
        const response = await  getAllUsers( token );
        console.log(response);
        if (response) {
            //fetchall without the current user
            setUsers(response.filter((user) => user.role !== 'admin'));
        }
        setIsLoading(false);
    };
    console.log("seconde debugger", showUserForm)

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log("third debugger", showUserForm)

    const handleDelete = async (id) => {
        setIsLoading(true);
        const token = await getToken();
        const response = await deleteUser(token, id);
        console.log(response);
        if (response) {
            setUsers(users.filter((user) => user.id !== id));
        }
        fetchUsers();
        setIsLoading(false);
    };

    console.log("fourth debugger", showUserForm)

    const handleSubmit = async (id, user) => {
        setIsLoading(true);
        const token = await getToken();
        const response = await updateUser(token, id, user);
        console.log(response);
        if (response) {
            fetchUsers();
        }
        fetchUsers();
        setShowUserForm(false);
        setIsLoading(false);

    };

    console.log("fifth debugger", showUserForm)

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowUserForm(true);
    }


    console.log("sixth debugger", showUserForm)


    


    const renderUserList = ()=> (
        <View>
            {isLoading ? (
         <ActivityIndicator size="large" color="#0000ff" />
            ) : (
        <>
            {users.map((user) => (
                <TouchableOpacity key={user.id} onPress={() => console.log(user)}>
                    <View style={styles.card}>

                        <Image style={{ width: 50, height: 50, borderRadius: 50 / 2, display: 'flex', alignSelf: 'center' }} 
                        source={require('../../../assets/images/avatar.png')}
                        />
                        <Text style={styles.cardText}>{user.firstName} {user.lastName}</Text>
                        <View style={styles.cardButtons}>
                        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(user)}>
                            <MaterialIcons name="edit" size={24} color="blue" style={styles.editButton} />
                        </TouchableOpacity>

                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(user.id)}>
                                <MaterialIcons name="delete" size={24} color="red" style={styles.deleteButton} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </>
            )}
        </View>
    );

    return (
        <ScrollView>
            {showUserForm ? (
                <UserForm
                    user={selectedUser}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowUserForm(false)}

                />
            ) : (
                renderUserList()
            )}
    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center',
        //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        //backgroundColor

        backgroundColor: '#d4d4d4',

        //flex
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    editButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default UserList;
