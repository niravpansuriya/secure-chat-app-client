import React, { useEffect, useState } from 'react';

export default function ChatMessage({
	text: te,
	type: t,
	isGroupMessage,
	sender,
}) {
	const [text, setText] = useState('');
	// SENT or RECEIVED
	const [type, setType] = useState('');
	useEffect(() => {
		setText(te);
		setType(t);
	}, [te, t]);

	return (
		<div className={`flex ${type === 'SENT' ? 'justify-end' : ''}`}>
			<div
				className={` ${
					type === 'SENT' ? 'bg-[#B6E5F0]' : 'bg-[#FDEEBF]'
				} text-black p-2 rounded-lg max-w-2xl`}
			>
				{isGroupMessage && type !== 'SENT' ? (
					<>
						<span className="text-blue-600 font-bold">
							{sender} :{' '}
						</span>{' '}
						{text}
					</>
				) : (
					text
				)}
			</div>
		</div>
	);
}
