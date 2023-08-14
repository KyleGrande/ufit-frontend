import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {api} from '../api';
type FeedBackCardProps = {
    username: any,
    comment: any,
    rating: any
}

/*
Requirements:
- Limits on comment word size

*/

export const FeedBackCard = ({username, comment, rating}: FeedBackCardProps) => {
    return (
        <View style = {{backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-between', padding: 10, borderRadius:10, shadowColor:'#171717',shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 10
        }}>
            <View>
                <View style = {{flexDirection:'row'}}>
                    <Text style = {{fontWeight: 'bold'}}>
                    Rating: 
                    </Text>
                    <Text> {rating}</Text>
                </View>
                <Text>
                    {comment}
                </Text>            
            </View>
                <Text>
                    {/*
                    TODO: get userName from database user id
                    Maybe new route to get userName?
                    {username}  */}
                </Text>                        
        </View>
    )
};

export default FeedBackCard;
