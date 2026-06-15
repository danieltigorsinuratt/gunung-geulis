<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'jenis',
        'content',
        'created_by',
    ];

    /**
     * Get the user who created this template.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
