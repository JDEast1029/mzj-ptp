/**
 * 个人中心首页
 */
import React, { Component } from 'react';
import { getHashUrl } from '@utils/utils';
import * as types from '@constants/actions/mine';
// 业务组件
import { MAIN_BG } from '@constants/constants';
import Cell from '@components/_common/Cell/Cell';
import './Styles.scss';
class Main extends Component {

	constructor(props) {
		super(props);
		this.loadMainData(props);
	}

	loadMainData(props) {
		const { mineMain: { isFetching } } = props;
		let url = types.MINE_MAIN_LIST_GET;
		let param = {
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
			},
			onError: (res) => {
				console.error(res.msg);
			}
		};
		props.actions.request(url, params, {});
	}

	handleDetail = () => {
		_global.history.push('/mine/detail');
	}

	render() {
		const { mineMain: { data = {} } } = this.props;
		return (
			<div className="v-mine-main" >
				<div
					className="g-flex g-jc-sa g-ai-c g-width g-m-b-10"
					style={{
						minHeight: 160,
						background: `url('${MAIN_BG}') no-repeat center`,
						backgroundSize: '100% auto',
						backgroundColor: '#fff'
					}}
				>
					<div className="g-flex g-jc-sa g-fw-w">
						<img
							src={data.avatar}
							className="_avatar g-tc"
							alt=""
							onClick={this.handleDetail}
							style={{ display: 'block', matgin: '0 auto' }}
						/>
						<p className="g-c-black g-fs-16 g-tc g-width" style={{ marginTop: 7 }}>{data.nick_name}</p>
					</div>
				</div>
				<Cell
					title="我的收藏"
					icon="icon-collect-select"
					onClick={() => _global.history.push('/mine/collect')}
					className={data.auth && 'g-border-b-line'}
				/>
				{
					data.auth
						? <Cell
							title="我的课程"
							icon="icon-lesson"
							iconStyles={{ fontSize: 17 }}
							onClick={() => _global.history.push('/mine/courses')}
						/>
						: ''
				}

			</div>
		);
	}

};

export default Main;
