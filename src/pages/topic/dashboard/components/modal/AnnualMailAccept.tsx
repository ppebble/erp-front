import { useLocation } from 'react-router-dom';
import logo from '../../../../../assets/img/logo/logo.png';
import redCircle from '../../../../../assets/img/logo/redCircle.png';
import { decryptData } from '../../../../../services/serialize/Deserialize';

type MailAcceptProps = {
	empNo: string;
	name: string;
	profileNo: number;
	team: string;
};

const AnnualMailAccept = () => {
	const location = useLocation();
	console.log(location.pathname.split('/'));
	const extractData = location.pathname.substring(21);
	console.log(extractData);

	// const encryptedData =
	// 	'xYXj6mgjPlOMz3ayHllDoFurhpl5GbSrnSS1bO4W/M6oMabbinb/PPodYS0F9QqQ4ErFrxRNlBK/ygMMMWGKofzatzGLGfsiQfE+3GqgsxNzdBhBN5S93KUib5/96wkD';
	const encryptedData = extractData;
	const secretKey = 'NexmoreUrlTokenParam!!!'; // key
	const decryptedData = decryptData(encryptedData, secretKey);
	const data: MailAcceptProps = JSON.parse(decryptedData);
	if (decryptedData) {
		console.log(data);
	}

	return (
		<div>
			<div className="m-0 m-auto items-center justify-center w-464px text-center text-base font-base"> </div>
			<table border={0} cellSpacing={0} cellPadding={0} className="m-0 m-auto items-center justify-center w-464px text-center text-base font-medium">
				<tbody>
					<tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
						<td style={{ borderBottom: 'solid #24205D 4pt', background: 'white' }} />
					</tr>
					<tr>
						<td style={{ borderBottom: 'solid #24205D 1pt', paddingTop: '1px' }} />
					</tr>
					<tr>
						<td className="font-bold">
							<div className="text-center mt-4 mb-4 font-large text-lg">
								<h1 className="p">(XX) 신 청 서 및 사 유 서</h1>
							</div>
						</td>
					</tr>
					<tr>
						<td style={{ borderBottom: 'solid #24205D 1pt' }} />
					</tr>
					<tr>
						<td style={{ borderBottom: 'solid #24205D 4pt', paddingTop: '1px' }} />
					</tr>
					<tr>
						<td>
							<div>
								<div>
									<div>
										<span>&nbsp;</span>
									</div>
									<span style={{ fontSize: '12pt', fontWeight: 'bold' }}>아래와 같이 (XX)를 신청하오니 승인하여 주시기 바랍니다. </span>
								</div>
								<div>
									<span>&nbsp;</span>
								</div>
								<table
									border={1}
									cellSpacing={31}
									cellPadding={0}
									style={{ textAlign: 'center', width: '100%', background: 'white', border: 'none', lineHeight: '1.3em' }}
								>
									<tbody>
										<tr>
											<td style={{ border: 'none' }}>
												<table
													border={1}
													cellSpacing={0}
													cellPadding={0}
													style={{ width: '100%', borderCollapse: 'collapse', border: 'none', fontSize: '10.0pt' }}
												>
													<tbody>
														<tr>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>소속부서</span>
															</td>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>{data.team || ''}</span>
															</td>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급</span>
															</td>
															<td
																style={{
																	border: 'solid 1.0pt',
																	width: '25%',
																	padding: '0cm 5.4pt 0cm 5.4pt',
																	height: '30.65pt',
																	textAlign: 'center',
																}}
															>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>XX</span>
															</td>
														</tr>
														<tr>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>사&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;번</span>
															</td>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>{data.empNo || ''}</span>
															</td>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명</span>
															</td>
															<td
																style={{
																	border: 'solid 1.0pt',
																	width: '25%',
																	padding: '0cm 5.4pt 0cm 5.4pt',
																	height: '30.65pt',
																	textAlign: 'center',
																}}
															>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>{data.name || ''}</span>
															</td>
														</tr>
														<tr>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간</span>
															</td>
															<td
																colSpan={3}
																style={{
																	border: 'solid 1.0pt',
																	width: '75%',
																	padding: '0cm 5.4pt 0cm 5.4pt',
																	height: '30.65pt',
																	textAlign: 'center',
																}}
															>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>
																	XXXX년 X 월 XX 일 (X 요일) X시 XX분 부터 ~ XXXX년 X 월 XX 일 (X 요일) XX시 XX분 까지 : ( X일간 )
																</span>
															</td>
														</tr>
														<tr>
															<td style={{ border: 'solid 1.0pt', width: '25%', padding: '0cm 5.4pt 0cm 5.4pt', textAlign: 'center' }}>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>사&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;유</span>
															</td>
															<td
																colSpan={3}
																style={{
																	border: 'solid 1.0pt',
																	width: '75%',
																	padding: '0cm 5.4pt 0cm 5.4pt',
																	height: '30.65pt',
																	textAlign: 'center',
																}}
															>
																<span style={{ fontSize: '9.0pt', fontWeight: 'bold' }}>XXXX</span>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={4} style={{ paddingTop: 0, width: '100%', border: 'none', verticalAlign: 'center' }}>
							<div style={{ textAlign: 'right', fontWeight: 'bold' }}>
								<div>
									<span>&nbsp;</span>
								</div>
								<div>
									<span>&nbsp;</span>
								</div>
								<span style={{ fontSize: '12.0pt' }}>XXXX 년 XX 월 XX 일</span>
							</div>
						</td>
						<td style={{ border: 'none' }} />
						<td style={{ border: 'none' }} />
						<td style={{ border: 'none' }} />
					</tr>
					<tr>
						<td colSpan={4} style={{ border: 'none', padding: '0pt 0pt 0pt 0pt', textAlign: 'right' }}>
							<span>※</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[경조]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[결근]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[조퇴]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[외출]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[연차]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[월차]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[반휴]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									paddingLeft: '3px',
									paddingRight: '2px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[MR]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[병가]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[하기휴가]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[대체휴무]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[야간작업]
							</span>
							<span
								style={{
									backgroundImage: `url(${redCircle})`,
									paddingBottom: '4px',
									paddingTop: '3px',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}
							>
								[보건휴가]
							</span>
						</td>
						<td style={{ border: 'none' }} />
						<td style={{ border: 'none' }} />
						<td style={{ border: 'none' }} />
					</tr>
					<tr>
						<td style={{ paddingTop: '7%' }}>
							<table border={0} cellSpacing={0} cellPadding={0} style={{ width: '104%' }}>
								<tbody>
									<tr>
										<td
											rowSpan={3}
											style={{
												borderRight: 'solid 1.0pt',
												borderLeft: 'solid 1.0pt',
												borderTop: 'solid 1.0pt',
												width: '17%',
												height: '80px',
												textAlign: 'center',
												fontWeight: 'bolder',
											}}
										>
											<h2>결재</h2>
										</td>
										<td
											style={{
												borderRight: 'solid 1.0pt',
												borderTop: 'solid 1.0pt',
												borderBottom: 'solid 1.0pt',
												width: '25%',
												height: '30%',
												textAlign: 'center',
											}}
										>
											신청자
										</td>
										<td
											style={{ borderRight: 'solid 1.0pt', borderTop: 'solid 1.0pt', borderBottom: 'solid 1.0pt', width: '25%', textAlign: 'center' }}
										>
											본부장
										</td>
										<td
											style={{ borderRight: 'solid 1.0pt', borderTop: 'solid 1.0pt', borderBottom: 'solid 1.0pt', width: '33%', textAlign: 'center' }}
										>
											대표이사
										</td>
									</tr>
									<tr>
										<td rowSpan={2} style={{ borderRight: 'solid 1.0pt', width: '17%', fontWeight: 'bolder', textAlign: 'center' }}>
											{data.name || ''}
										</td>
										<td rowSpan={2} style={{ borderRight: 'solid 1.0pt', width: '25%', fontWeight: 'bolder', textAlign: 'center' }}>
											XXX
										</td>
										<td rowSpan={2} style={{ borderRight: 'solid 1.0pt', width: '25%', fontWeight: 'bolder', textAlign: 'center' }}>
											XXX
										</td>
										<td rowSpan={2} style={{ width: '33%', fontWeight: 'bolder' }} />
									</tr>
									<tr>
										<td style={{ width: '17%', fontWeight: 'bolder' }} />
										<td style={{ width: '25%', fontWeight: 'bolder' }}>&nbsp;</td>
										<td style={{ width: '25%', fontWeight: 'bolder' }}>&nbsp;</td>
										<td style={{ width: '33%', fontWeight: 'bolder' }}>&nbsp;</td>
									</tr>
									<tr>
										<td style={{ borderTop: 'solid 1.0pt', width: '17%', fontWeight: 'bolder' }} />
										<td style={{ borderTop: 'solid 1.0pt', width: '25%', fontWeight: 'bolder' }}>&nbsp;</td>
										<td style={{ borderTop: 'solid 1.0pt', width: '25%', fontWeight: 'bolder' }}>&nbsp;</td>
										<td style={{ borderTop: 'solid 1.0pt', width: '33%', fontWeight: 'bolder' }}>&nbsp;</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td style={{ padding: '0pt 7.5pt 7.5pt 0pt', textAlign: 'right' }}>
							<img src={logo} alt="NEXMORE" />
						</td>
					</tr>
					{/* <tr>
						<td style={{ textAlign: 'left' }}>첨부 : [사유서 또는 향군등의 경우 자료 첨부]</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
};
export default AnnualMailAccept;
