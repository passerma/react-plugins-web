import React, { Component, Fragment } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Publish.less'
import E from "wangeditor";
import { postPluginDetail } from './request'
import pluginAllClass from '../utils/pluginAllClass'
import { Input, Select, Tooltip, message, Cascader, Upload, Modal } from 'antd';
import { CascaderValueType } from 'antd/lib/cascader'
import { RcFile } from 'antd/lib/upload'
import {
    QuestionCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

//#region 类型定义
interface stateType {
    pluginName: string,
    pluginDesc: string,
    reactValue: string,
    reactInput: string,
    chromeValue: string,
    chromeInput: string,
    firefoxValue: string,
    firefoxInput: string,
    safariValue: string,
    safariInput: string,
    ieValue: string,
    ieInput: string,
    pluginUrl: string,
    pluginClassValue: string[],
    bgImgUrl: string,
    codeFileName: string
}
//#endregion

class Publish extends Component<RouteComponentProps, stateType> {
    state: stateType = {
        pluginName: '',
        pluginDesc: '',
        reactValue: '1',
        reactInput: '',
        chromeValue: '1',
        chromeInput: '',
        firefoxValue: '1',
        firefoxInput: '',
        safariValue: '1',
        safariInput: '',
        ieValue: '1',
        ieInput: '',
        pluginUrl: '',
        pluginClassValue: ['others'],
        bgImgUrl: '',
        codeFileName: ''
    };
    uploadBgImgRef = React.createRef<HTMLInputElement>()
    bgImgFile: File | null = null;
    codeFile: File | null = null;
    editorContent: string = '';

    componentDidMount() {
        const editor = new E("#publishEditor");
        editor.config.menus = [
            'head',
            'bold',
            'fontSize',
            'fontName',
            'italic',
            'underline',
            'strikeThrough',
            'indent',
            'lineHeight',
            'foreColor',
            'backColor',
            'link',
            'list',
            'justify',
            'quote',
            'image',
            'table',
            'code',
            'splitLine',
            'undo',
            'redo',
        ]
        editor.config.zIndex = 0
        editor.config.showFullScreen = false
        editor.config.onchange = (html: string) => {
            this.editorContent = html
        }
        editor.create();
    }

    //#region 版本选择
    // react
    _handleReactChange = (value: string) => {
        this.setState({
            reactValue: value,
            reactInput: value !== '3' ? '' : this.state.reactInput
        })
    }
    _handleReactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            reactInput: e.target.value
        })
    }

    // chrome
    _handleChromeChange = (value: string) => {
        this.setState({
            chromeValue: value,
            chromeInput: value !== '3' ? '' : this.state.chromeInput
        })
    }
    _handleChromeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            chromeInput: e.target.value
        })
    }

    // firefox
    _handleFirefoxChange = (value: string) => {
        this.setState({
            firefoxValue: value,
            firefoxInput: value !== '3' ? '' : this.state.firefoxInput
        })
    }
    _handleFirefoxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            firefoxInput: e.target.value
        })
    }

    // safari
    _handleSafariChange = (value: string) => {
        this.setState({
            safariValue: value,
            safariInput: value !== '3' ? '' : this.state.safariInput
        })
    }
    _handleSafariInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            safariInput: e.target.value
        })
    }

    //ie
    _handleIEChange = (value: string) => {
        this.setState({
            ieValue: value,
            ieInput: value !== '3' ? '' : this.state.ieInput
        })
    }
    _handleIEInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ieInput: e.target.value
        })
    }
    //#endregion

    //#region 插件信息
    _plginNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            pluginName: e.target.value
        })
    }
    _pluginDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            pluginDesc: e.target.value
        })
    }
    _plginUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            pluginUrl: e.target.value
        })
    }
    _pluginClassChange = (value: CascaderValueType) => {
        this.setState({
            pluginClassValue: value as string[]
        })
    }
    //#endregion

    //#region 文件上传
    /**
     * 图片上传
     */
    _uploadBgImgBtn = () => {
        this.uploadBgImgRef.current?.click()
    }

    /**
     * 监听获取文件
     */
    _uploadBgImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const imgFile = e.target!.result;
            this.setState({
                bgImgUrl: imgFile as string
            })
        };
        reader.readAsDataURL(e.target.files![0]);
        this.bgImgFile = e.target.files![0]
    }

    /**
     * 代码上传
     */
    _uploadFile = (file: RcFile): boolean => {
        this.codeFile = file
        this.setState({
            codeFileName: file.name
        })
        return false
    }
    //#endregion

    //#region 提交
    _submitPlugin = () => {
        let formData = new FormData()
        if (this.codeFile) {
            formData.append('pluginFile', this.codeFile)
        } else {
            message.info('请上传包含一个演示界面的代码压缩包！')
            return
        }
        if (this.bgImgFile) {
            formData.append('pluginFile', this.bgImgFile)
        }
        if (this.state.pluginUrl) {
            formData.append('pluginUrl', this.state.pluginUrl)
        }
        if (!this.state.pluginName || !this.state.pluginDesc || !this.editorContent || !this.state.pluginClassValue) {
            message.info('请填写完整的插件信息！')
            return
        } else {
            formData.append('pluginName', this.state.pluginName)
            formData.append('pluginDesc', this.state.pluginDesc)
            formData.append('pluginUse', this.editorContent)
            let classValue = ''
            if (this.state.pluginClassValue.length === 1) {
                classValue = `more_${this.state.pluginClassValue[0]}`
            } else {
                classValue = this.state.pluginClassValue.join('_')
            }
            formData.append('pluginClassValue', classValue)
        }
        if (this.state.reactValue === '3' && this.state.reactInput.trim() === '') {
            message.info('请填写支持react的版本！')
            return
        } else {
            formData.append('react', `${this.state.reactValue}-${this.state.reactInput.trim()}`)
        }
        if (this.state.chromeValue === '3' && this.state.chromeInput.trim() === '') {
            message.info('请填写支持chrome的版本！')
            return
        } else {
            formData.append('chrome', `${this.state.chromeValue}-${this.state.chromeInput.trim()}`)
        }
        if (this.state.firefoxValue === '3' && this.state.firefoxInput.trim() === '') {
            message.info('请填写支持firefox的版本！')
            return
        } else {
            formData.append('firefox', `${this.state.firefoxValue}-${this.state.firefoxInput.trim()}`)
        }
        if (this.state.safariValue === '3' && this.state.safariInput.trim() === '') {
            message.info('请填写支持safari的版本！')
            return
        } else {
            formData.append('safari', `${this.state.safariValue}-${this.state.safariInput.trim()}`)
        }
        if (this.state.ieValue === '3' && this.state.ieInput.trim() === '') {
            message.info('请填写支持ie的版本！')
            return
        } else {
            formData.append('ie', `${this.state.ieValue}-${this.state.ieValue.trim()}`)
        }
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '测试阶段，无需登录，无需审核，数据将于12.31号删除，如需保留请先存在本地，之后再进行上传',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                const hide = message.loading('插件上传中..', 0);
                postPluginDetail(formData).then(res => {
                    if (res && res.ErrCode === 0) {
                        hide();
                        message.success('上传成功！')
                        this.props.history.push('/manage')
                    } else {
                        hide();
                        res && message.error(res.ErrMsg)
                    }
                })
            }
        });
    }
    //#endregion

    render() {
        let { pluginName, pluginDesc, reactValue, reactInput, chromeInput, chromeValue, firefoxValue, firefoxInput,
            safariValue, safariInput, ieValue, ieInput, pluginUrl, pluginClassValue, bgImgUrl, codeFileName } = this.state
        return (
            <div className="publish">
                <div className="publish-title">
                    发布请提供完整的使用说明，同时提供一个演示界面，具体发布教程请前往帮助页查看
                </div>
                <div className="publish-upload">
                    {
                        codeFileName ? codeFileName : '将包含演示界面的代码压缩包拖拽至框内上传，仅支持zip及rar格式压缩包'
                    }
                    {
                        !codeFileName && <Tooltip title={
                            <div>
                                <div>· 大小15M以内</div>
                                <div>· 仅zip，rar格式</div>
                            </div>
                        }>
                            <QuestionCircleOutlined style={{ cursor: 'pointer', margin: '0 8px' }} />
                        </Tooltip>
                    }
                    <Upload accept=".zip, .rar" showUploadList={false} beforeUpload={this._uploadFile}>
                        <span className="publish-upload-click">{codeFileName ? '重新上传' : '点此上传'}</span>
                    </Upload>
                </div>
                <div className="publish-box">
                    <div className="publish-box-top">
                        <div className="publish-box-top-img">
                            {bgImgUrl && <img src={bgImgUrl} />}
                            <div className="publish-box-top-img-name" onClick={this._uploadBgImgBtn}>
                                {
                                    !bgImgUrl && <Fragment>
                                        拖拽或点击上传你的自定义插件封面，没有可不上传
                                        <Tooltip title={
                                            <div>
                                                <div>· 大小4M以内</div>
                                                <div>· 仅jpg，png，bmp，gif格式</div>
                                            </div>
                                        }>
                                            <QuestionCircleOutlined style={{ cursor: 'pointer', margin: '0 8px' }} />
                                        </Tooltip>
                                    </Fragment>
                                }
                                <input ref={this.uploadBgImgRef} style={{ display: 'none' }} type="file"
                                    onChange={this._uploadBgImgChange} accept=".jpg, .png, .bmp, .gif" />
                            </div>
                        </div>
                        <div className="publish-box-info">
                            <div className="item"><span>名称</span>
                                <Input value={pluginName} onChange={this._plginNameChange} />
                            </div>
                            <div className="item"><span>描述</span>
                                <TextArea value={pluginDesc} onChange={this._pluginDescChange} />
                            </div>
                            <div className="version react">
                                <span className="version-name">react版本</span>
                                <Select value={reactValue} style={{ width: 120 }} onChange={this._handleReactChange}>
                                    <Option value="1">最新</Option>
                                    <Option value="2">不涉及</Option>
                                    <Option value="3">版本</Option>
                                </Select>
                                <Input disabled={reactValue !== '3'} onChange={this._handleReactInputChange} value={reactInput} />
                            </div>
                            <div className="version">
                                <span className="version-name">chrome</span>
                                <Select value={chromeValue} style={{ width: 120 }} onChange={this._handleChromeChange}>
                                    <Option value="1">支持</Option>
                                    <Option value="2">不涉及</Option>
                                    <Option value="3">版本</Option>
                                </Select>
                                <Input disabled={chromeValue !== '3'} onChange={this._handleChromeInputChange} value={chromeInput} />
                            </div>
                            <div className="version">
                                <span className="version-name">firefox</span>
                                <Select value={firefoxValue} style={{ width: 120 }} onChange={this._handleFirefoxChange}>
                                    <Option value="1">支持</Option>
                                    <Option value="2">不涉及</Option>
                                    <Option value="3">版本</Option>
                                </Select>
                                <Input disabled={firefoxValue !== '3'} onChange={this._handleFirefoxInputChange} value={firefoxInput} />
                            </div>
                            <div className="version">
                                <span className="version-name">safari</span>
                                <Select value={safariValue} style={{ width: 120 }} onChange={this._handleSafariChange}>
                                    <Option value="1">支持</Option>
                                    <Option value="2">不涉及</Option>
                                    <Option value="3">版本</Option>
                                </Select>
                                <Input disabled={safariValue !== '3'} onChange={this._handleSafariInputChange} value={safariInput} />
                            </div>
                            <div className="version">
                                <span className="version-name">ie</span>
                                <Select value={ieValue} style={{ width: 120 }} onChange={this._handleIEChange}>
                                    <Option value="1">支持</Option>
                                    <Option value="2">不涉及</Option>
                                    <Option value="3">版本</Option>
                                </Select>
                                <Input disabled={ieValue !== '3'} onChange={this._handleIEInputChange} value={ieInput} />
                            </div>
                        </div>
                    </div>
                    <div className="publish-box-edit-name">使用方法</div>
                    <div id="publishEditor"></div>
                </div>
                <div className="publish-link">
                    <div className="publish-link-http">
                        <span className="title">插件网站</span>
                        <Tooltip title="您的自定义展示插件的网站地址">
                            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
                        </Tooltip>
                        <Input placeholder="插件网站地址，如www.passerma.com，没有可不填" value={pluginUrl}
                            onChange={this._plginUrlChange} />
                    </div>
                    <div className="publish-link-class">
                        <span>插件分类</span>
                        <Tooltip title="请选择较近的分类">
                            <QuestionCircleOutlined style={{ cursor: 'pointer', margin: '0 8px' }} />
                        </Tooltip>
                        <Cascader
                            value={pluginClassValue}
                            options={pluginAllClass}
                            allowClear={false}
                            onChange={this._pluginClassChange}
                            expandTrigger='hover'
                        />
                    </div>
                </div>
                <div className="publish-submit">
                    <div onClick={this._submitPlugin}>提交</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Publish)