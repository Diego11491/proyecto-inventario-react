// src/services/productosService.js
import { supabase } from "../supabaseClient";

export async function obtenerProductos() {
  const { data, error } = await supabase.from("productos").select();
  if (error) throw error;
  return data;
}

export async function agregarProducto(nuevoProducto) {
  // La cadena de insert() seguido de select()
  const { data, error } = await supabase.from("productos").insert(nuevoProducto).select();
  if (error) throw error;
  return data;
}
