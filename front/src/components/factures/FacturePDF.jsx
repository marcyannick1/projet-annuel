import React from "react";
import {Page, Text, View, Document, StyleSheet, Image, Line, Svg} from "@react-pdf/renderer";
import logo_ctos from "../../assets/logo_ctos.png"

// Définir le style
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 20
    },
    section: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    table: {
        // display: "flex",
        // width: "auto",
        // marginTop: 20,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tableHead: {
        color: "gray"
    },
    tableCol: {
        width: "15%",
        textAlign: "right",
    },
    tableCell: {
        fontSize: 10,
    }
});
const Divider = () => (
    <Svg height={1}>
        <Line
            x1="0"
            y1="0"
            x2="2000"
            y2="0"
            strokeWidth={2}
            stroke="#d9d9d9"
        />
    </Svg>
)
// Composant de Facture PDF
const FacturePDF = ({user, subscription}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image src={logo_ctos} style={{width: 150}}/>
                <Text style={{fontSize: 14}}>Facture du N°{subscription.id} du {new Date(subscription.createdAt).toLocaleDateString()}</Text>
            </View>
            <Divider/>
            <View style={{marginBottom: 20, marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Text style={{fontSize: 10, marginVertical: 5, color: "#4478ff"}}>Informations Client:</Text>
                    <View style={{display: "flex", flexDirection: "column", gap: 5}}>
                        <Text style={{fontSize: 12}}>{user.firstName} {user.lastName}</Text>
                        <Text style={{fontSize: 10, color: "#525252"}}>{user.address}</Text>
                        <Text style={{fontSize: 10, color: "#525252"}}>{user.email}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{fontSize: 10, marginVertical: 5, color: "#4478ff"}}>Informations Société:</Text>
                    <View style={{display: "flex", flexDirection: "column", gap: 5}}>
                        <Text style={{fontSize: 12}}>Société CTOS</Text>
                        <Text style={{fontSize: 10, color: "#525252"}}>4 Rue Nelson Mandela, 78310 Maurepas</Text>
                        <Text style={{fontSize: 10, color: "#525252"}}>N°Siret: 362 521 879 00034</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{fontSize: 10, marginVertical: 5, color: "#4478ff"}}>Details Facture:</Text>
                <Divider/>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHead]}>
                        <View style={{width: "40%"}}>
                            <Text style={styles.tableCell}>Désignation</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Qté</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Prix HT</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>TVA</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Total TTC</Text>
                        </View>
                    </View>

                    {/* Ligne 1 */}
                    <View style={styles.tableRow}>
                        <View style={{width: "40%"}}>
                            <Text style={styles.tableCell}>Achat stockage 20Go</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>1</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>16,67€</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>3,33€</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>20€</Text>
                        </View>
                    </View>

                    {/*Ligne Total*/}
                    <View style={{...styles.tableRow, justifyContent: "space-between"}}>
                        <View>
                            <Text style={styles.tableCell}>Total</Text>
                        </View>
                        <View>
                            <Text style={styles.tableCell}>20€</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default FacturePDF;
