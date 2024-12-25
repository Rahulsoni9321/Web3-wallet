import {generateMnemonic,mnemonicToSeedSync} from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";




let seed = "";
let solanaWallet = 0;
export function generateSecretPhrase():any {
    const mnemonic = generateMnemonic();
     seed = mnemonicToSeedSync(mnemonic).toString("hex");
    return mnemonic;
}

export function createSolanaWallet():any {
        const path = `m/44'/501'/${solanaWallet}'/0'`;
        solanaWallet++;
        const derivedSeed = derivePath(path, seed).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

        return {
            publicKey,
            secret
        };
}