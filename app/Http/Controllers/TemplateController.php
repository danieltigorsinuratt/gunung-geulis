<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of templates.
     */
    public function index()
    {
        $templates = Template::with('creator')->latest()->get();

        return Inertia::render('Templates/Index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Store a newly created template.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jenis' => 'required|in:masuk,keluar,internal,keputusan',
            'content' => 'nullable|string',
        ]);

        $validated['created_by'] = auth()->id();

        Template::create($validated);

        return redirect()->route('templates.index')
            ->with('success', 'Template berhasil ditambahkan');
    }

    /**
     * Update the specified template.
     */
    public function update(Request $request, Template $template)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jenis' => 'required|in:masuk,keluar,internal,keputusan',
            'content' => 'nullable|string',
        ]);

        $template->update($validated);

        return redirect()->route('templates.index')
            ->with('success', 'Template berhasil diperbarui');
    }

    /**
     * Remove the specified template.
     */
    public function destroy(Template $template)
    {
        $template->delete();

        return redirect()->route('templates.index')
            ->with('success', 'Template berhasil dihapus');
    }
}
