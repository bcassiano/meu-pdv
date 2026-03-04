import { NextResponse } from "next/server";
import { DatabaseFactory } from "@/db/factory";

export async function GET() {
    try {
        const pdvRepository = DatabaseFactory.getPdvRepository();
        const pdvs = await pdvRepository.getAll();

        return NextResponse.json(pdvs);
    } catch (error: any) {
        console.error("❌ Erro ao listar PDVs:", error);
        return NextResponse.json(
            { error: "Erro interno ao buscar PDVs", details: error.message },
            { status: 500 }
        );
    }
}
