export default function formatCurrency(num) {
    return "R$ " + num.toString().replace(".", ",")
}