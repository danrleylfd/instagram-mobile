import React, { Component } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'
import ImagePicker from 'react-native-image-picker'
import styles from './New.css.js'

export default class New extends Component {
    static navigationOptions = {
        headerTitle: 'Nova publicação'
    }

    state = {
        preview: null,
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: ''
    }

    handleSelectImage = () => {
        ImagePicker.showImagePicker({
            title: 'Selecionar imagem'
        }, upload => {
            if(upload.error) {
                console.log('Error')
            } else if (upload.didCancel) {
                console.log('Used canceled')
            } else {
                const preview = {
                    uri: `data:image/jpegbase64,${upload.data}`
                }
                const { uri, type } = upload
                let name = upload.fileName ? `${upload.fileName.split('.')[0]}.jpg` : `${new Date().getTime()}.jpg`
                const image = {
                    uri,
                    type,
                    name
                }
                this.setState({ preview, image })
            }
        })
    }

    handleSubmit = async () => {
        const data = new FormData()
        data.append('image', this.state.image)
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)
        try {
            await api.post('posts', data)
            this.props.navigation.navigate('Feed')
        } catch (e) {
            console.warn("erro na requisição")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
                    <Text style={styles.selectButtonText}>Selecionar imagem</Text>
                </TouchableOpacity>
                <Image style={styles.preview} source={this.state.preview || {}} />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Nome do autor"
                    placeholderTextColor="#999"
                    value={this.state.author}
                    onChangeText={author => this.setState({ author })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Local da foto"
                    placeholderTextColor="#999"
                    value={this.state.place}
                    onChangeText={place => this.setState({ place })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Descrição"
                    placeholderTextColor="#999"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Hashtags"
                    placeholderTextColor="#999"
                    value={this.state.hashtags}
                    onChangeText={hashtags => this.setState({ hashtags })}
                />
                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
