import React, { Component } from 'react';
import './HexToRgb.css';

class HexToRgb extends Component {
    constructor(){
        super();
        this.state = { hex: "#000000", r: "0", g: "0", b: "0" };
        this.style = {backgroundColor: '#ffffff', color: '#000000'};
    }

    convertHexToRgb = (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    convertRgbToHex = (rgb) => {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    };

    updateColors = (hex, r, g, b) => {
        var o = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) /1000);
        this.styles = { backgroundColor: hex, color: o > 125 ? '#000000' : '#ffffff' };
    };

    handleInputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState({ [key]: value.toUpperCase() });
    };

    handleSubmit = (e) => {
        if(e.target.name === "hex") {
            const rgb = this.convertHexToRgb(e.target.value);
            if(rgb === null) {
                this.setState({hex: "invalid", r: null, g: null, b: null})
            } else {
                this.setState({hex: e.target.value, r: rgb.r, g: rgb.g, b: rgb.b}, () => {
                    this.updateColors(this.state.hex, this.state.r, this.state.b, this.state.g);
                });
            }
        } else {
            const rgb = {r: this.state.r, g: this.state.g, b: this.state.b};
            rgb[e.target.name] = e.target.value;
            const stringRGB = 'rgba(' + rgb.r.toString() + ',' + rgb.g.toString() + ',' + rgb.b.toString() + ')';
            const hex = this.convertRgbToHex(stringRGB).toUpperCase();
            this.setState({ hex, r: rgb.r, g: rgb.g, b: rgb.b }, () => {
                this.updateColors(this.state.hex, this.state.r, this.state.b, this.state.g);
            });
        }
    };

    render() {
        return (
            <div className="HexToRgb">
                <div style={this.styles}>
                    <h4>Hex - RGB Converter</h4>
                    <p>Simply enter your values and click out of the input, you may convert in either direction</p>
                    <div className="row">
                        <p>Hex:</p>
                        <input type="text" name="hex" ref="hex" onChange={ this.handleInputChange } onBlur={ this.handleSubmit } value={this.state.hex} />
                    </div>
                    <div className="row">
                        <p>R:</p>
                        <input type="text" name="r" ref="r" onChange={ this.handleInputChange } onBlur={ this.handleSubmit } value={this.state.r} />
                    </div>
                    <div className="row">
                        <p>G:</p>
                        <input type="text" name="g" ref="g" onChange={ this.handleInputChange } onBlur={ this.handleSubmit } value={this.state.g} />
                    </div>
                    <div className="row">
                        <p>B:</p>
                        <input type="text" name="b" ref="b" onChange={ this.handleInputChange } onBlur={ this.handleSubmit } value={this.state.b} />
                    </div>
                    <p>Stick to valid hex color codes/RGB values for now as there is no error handling.</p>
                </div>
            </div>
        );
    }
}

export default HexToRgb;
