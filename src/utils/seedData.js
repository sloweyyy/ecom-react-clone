// Sample contact messages for demonstration
export const seedContactMessages = () => {
	const existingMessages = localStorage.getItem("contactMessages");

	// Only seed if there are no existing messages
	if (!existingMessages || JSON.parse(existingMessages).length === 0) {
		const sampleMessages = [
			{
				id: 1,
				name: "John Smith",
				email: "john.smith@email.com",
				subject: "order",
				message:
					"Hi, I have a question about my recent order #12345. The tracking shows it was delivered but I haven't received it yet. Could you please help me locate my package?",
				timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
			},
			{
				id: 2,
				name: "Sarah Johnson",
				email: "sarah.j@gmail.com",
				subject: "return",
				message:
					"I would like to return a shirt I purchased last week. It doesn't fit properly and I'd like to exchange it for a different size. What's the process for returns?",
				timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
			},
			{
				id: 3,
				name: "Mike Chen",
				email: "mchen@business.com",
				subject: "partnership",
				message:
					"Hello, I represent a local business and we're interested in partnering with you for bulk orders. Could we schedule a meeting to discuss wholesale pricing and terms?",
				timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
			},
			{
				id: 4,
				name: "Emma Wilson",
				email: "emma.wilson94@email.com",
				subject: "feedback",
				message:
					"I just wanted to say that your customer service is amazing! The team helped me find exactly what I was looking for and the delivery was super fast. Keep up the great work!",
				timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
			},
			{
				id: 5,
				name: "David Brown",
				email: "dbrown@techcorp.com",
				subject: "support",
				message:
					"I'm having trouble with the checkout process. Every time I try to complete my purchase, I get an error message. I've tried different browsers and payment methods but nothing works. Please help!",
				timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
			},
		];

		localStorage.setItem("contactMessages", JSON.stringify(sampleMessages));
		return true; // Indicates data was seeded
	}

	return false; // Indicates no seeding was needed
};
