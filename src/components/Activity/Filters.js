import React from 'react';
import { Button, TouchableOpacity, Text, View, Switch } from 'react-native';
import { t } from 'react-native-tailwindcss';
import Modal from "react-native-modal";
import SwitchField from '../Fields/SwitchField';

export default class Filters extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            filters: this.props.filters,
        };
    }

    handleClose = () => {
        this.props.onClose(this.state.filters);
        this.setState({ isVisible: false });
    }

    toggle = (key) => {
        let { filters } = this.state;

        if (key !== 'entire') {
            filters.entire = false;
            filters[key] = !filters[key];
        } else {
            Object.keys(filters).forEach(key => {
                filters[key] = false;
            });
            filters.entire = true;
        }
        this.setState({ filters });
    }

    render() {
        const { entire, workshop, keynote, entertainment, featured, advisor, general, milner, sangren, bernhard } = this.state.filters;
        const { isVisible } = this.state;

        return (
            <View style={[t.flex1]}>
                <TouchableOpacity style={[t.borderL, t.borderT, t.borderGray400, t.pB8, t.pT1, t.bgGray300]}>
                    <Button title="Filters" onPress={() => this.setState({ isVisible: true })} />
                </TouchableOpacity>

                <Modal
                    isVisible={isVisible}
                    onBackdropPress={this.handleClose}
                >
                    <View style={[t.bgWhite, t.p4, t.justifyCenter, t.itemsCenter, t.rounded]}>
                        <SwitchField field='entire' value={entire} label="All Items" onToggle={this.toggle} />
                        <SwitchField field='workshop' value={workshop} onToggle={this.toggle} />
                        <SwitchField field='keynote' value={keynote} onToggle={this.toggle} />
                        <SwitchField field='entertainment' value={entertainment} onToggle={this.toggle} />
                        <SwitchField field='featured' value={featured} onToggle={this.toggle} />
                        <SwitchField field='advisor' value={advisor} onToggle={this.toggle} />
                        <SwitchField field='general' value={general} onToggle={this.toggle} />
                        {/* <SwitchField field='milner' value={milner} label="Milner Auditorium" onToggle={this.toggle} /> */}
                        {/* <SwitchField field='sangren' value={sangren} onToggle={this.toggle} /> */}
                        {/* <SwitchField field='bernhard' value={bernhard} onToggle={this.toggle} /> */}

                        <Button style={t.mT2} onPress={this.handleClose} title="Close" />
                    </View>
                </Modal>
            </View>
        );
    }
}